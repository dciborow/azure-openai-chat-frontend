import React from 'react';
import { Button } from '@fluentui/react-components';

const ChatActionButton = ({ label, svgIcon, isDisabled, actionId, tooltip }) => {
  return (
    <Button
      title={label}
      data-testid={actionId}
      disabled={isDisabled}
      icon={<img src={svgIcon} alt={label} />}
      aria-label={tooltip ?? label}
    >
      {tooltip ?? label}
    </Button>
  );
};

export default ChatActionButton;
