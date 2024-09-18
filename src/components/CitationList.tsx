import React, { useState } from 'react';
import { Citation } from '../types';
import { styles } from '../styles/citationList';

interface CitationListProps {
  label?: string;
  citations?: Citation[];
  selectedCitation?: Citation;
  onCitationClick?: (citation: Citation) => void;
}

const CitationList: React.FC<CitationListProps> = ({ label, citations, selectedCitation, onCitationClick }) => {
  const [selected, setSelected] = useState<Citation | undefined>(selectedCitation);

  const handleCitationClick = (citation: Citation, event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    event.preventDefault();
    setSelected(citation);
    if (onCitationClick) {
      onCitationClick(citation);
    }
  };

  const compareCitation = (citationA: Citation | undefined, citationB: Citation | undefined) => {
    return citationA && citationB && citationA.text === citationB.text;
  };

  const renderCitation = (citations: Citation[] | undefined) => {
    if (citations && citations.length > 0) {
      return (
        <ol className="items__list">
          {label && <h3 className="subheadline--small">{label}</h3>}
          {citations.map((citation) => (
            <li key={citation.text} className={`items__listItem ${compareCitation(citation, selected) ? 'active' : ''}`}>
              <a
                className="items__link"
                href="#"
                data-testid="citation"
                onClick={(event) => handleCitationClick(citation, event)}
              >
                {citation.ref}. {citation.text}
              </a>
            </li>
          ))}
        </ol>
      );
    }
    return null;
  };

  return <div>{renderCitation(citations)}</div>;
};

export default CitationList;
