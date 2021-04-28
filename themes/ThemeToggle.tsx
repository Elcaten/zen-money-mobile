import React from 'react';
import {Switch} from 'react-native';
import {useThemeToggle} from './use-theme-toggle';

export const ThemeToggle: React.FC = () => {
  const {isDarkThemeEnabled, toggleTheme} = useThemeToggle();

  return <Switch value={isDarkThemeEnabled} onValueChange={toggleTheme} />;
};
