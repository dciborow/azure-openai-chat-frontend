import React from 'react';
import { Spinner, Text } from '@fluentui/react-components';

const LoadingIndicator = ({ label }) => {
  return (
    <div data-testid="loading-indicator" aria-label={label} style={{ display: 'flex', alignItems: 'center' }}>
      <Spinner />
      <Text>{label}</Text>
    </div>
  );
};

export default LoadingIndicator;
