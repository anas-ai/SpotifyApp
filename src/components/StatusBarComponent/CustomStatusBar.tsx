import React, { useState } from 'react';
import { StatusBar } from 'react-native';

interface StatusBarProps {
  backgroundColor?: string; // Optional prop with a default value
}

const StatusBarComponent: React.FC<StatusBarProps> = ({ backgroundColor = '#FFFFFF' }) => {
  const [hidden, setHidden] = useState(false);
  const [statusBarTransition] = useState<'fade' | 'slide' | 'none'>('fade');

  return (
    <StatusBar
      animated
      backgroundColor={backgroundColor}
      showHideTransition={statusBarTransition}
      hidden={hidden}
      barStyle="light-content"
    />
  );
};

export default StatusBarComponent;
