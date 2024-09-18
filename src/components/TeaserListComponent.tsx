import React from 'react';
import { Teaser } from '../types';
import { styles } from '../styles/teaserListComponent';

interface TeaserListComponentProps {
  teasers: Teaser[];
  heading?: string;
  actionLabel?: string;
  alwaysRow?: boolean;
  clickable?: boolean;
  onTeaserClick?: (teaser: Teaser) => void;
}

const TeaserListComponent: React.FC<TeaserListComponentProps> = ({
  teasers,
  heading,
  actionLabel,
  alwaysRow = false,
  clickable = false,
  onTeaserClick,
}) => {
  const handleTeaserClick = (teaser: Teaser, event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    event.preventDefault();
    if (onTeaserClick) {
      onTeaserClick(teaser);
    }
  };

  const renderClickableTeaser = (teaser: Teaser) => {
    return (
      <a
        role="button"
        href="#"
        data-testid="default-question"
        onClick={(event) => handleTeaserClick(teaser, event)}
      >
        {teaser.description}
        <span className="teaser-click-label">{actionLabel}</span>
      </a>
    );
  };

  return (
    <div className="teaser-list-container">
      {heading && <h1 className="headline">{heading}</h1>}
      <ul className={`teaser-list ${alwaysRow ? 'always-row' : ''}`}>
        {teasers.map((teaser) => (
          <li key={teaser.description} className="teaser-list-item">
            {clickable ? renderClickableTeaser(teaser) : teaser.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TeaserListComponent;
