import React, { useEffect, useState } from 'react';
import { globalConfig } from '../config/globalConfig';
import { marked } from 'marked';
import LoadingIndicator from './LoadingIndicator';

interface DocumentPreviewerProps {
  url: string;
}

const DocumentPreviewer: React.FC<DocumentPreviewerProps> = ({ url }) => {
  const [previewContent, setPreviewContent] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);

  const retrieveMarkdown = async () => {
    if (url) {
      setLoading(true);
      try {
        const response = await fetch(url);
        const text = await response.text();
        setPreviewContent(marked.parse(text));
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (url && url.endsWith('.md')) {
      retrieveMarkdown();
    }
  }, [url]);

  const renderContent = () => {
    if (url) {
      return previewContent ? (
        <div dangerouslySetInnerHTML={{ __html: previewContent }} />
      ) : (
        <iframe title="Preview" src={url} width="100%" height="850px" sandbox="" />
      );
    }
    return null;
  };

  return (
    <div>
      {loading ? <LoadingIndicator label={globalConfig.LOADING_TEXT} /> : renderContent()}
    </div>
  );
};

export default DocumentPreviewer;
