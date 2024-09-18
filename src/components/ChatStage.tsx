import React from 'react';
import { Text } from '@fluentui/react-components';

const ChatStage = ({ pagetitle, url, svgIcon }) => {
  return (
    <header className="chat-stage__header" data-testid="chat-branding">
      <a href={url} target="_blank" rel="noopener noreferrer">
        <img src={svgIcon} alt={pagetitle} />
      </a>
      <Header as="h1" className="chat-stage__hl">
        <Text>{pagetitle}</Text>
      </Header>
    </header>
  );
};

export default ChatStage;
