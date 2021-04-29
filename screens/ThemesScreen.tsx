import * as React from 'react';
import styled from 'styled-components/native';
import {ListItem} from '../components/ListItem';
import {useThemeToggle} from '../themes';
import {RadioButton} from './components';

const Subtitle = styled(ListItem.Subtitle)`
  color: #8a8a8c;
`;

export const ThemesScreen: React.FC = () => {
  const {isDarkThemeEnabled, toggleTheme} = useThemeToggle();
  return (
    <React.Fragment>
      <ListItem disabled disabledStyle={{opacity: 0.5}}>
        <RadioButton />
        <ListItem.Content>
          <ListItem.Title>System default</ListItem.Title>
          <Subtitle>Turn on dark when your device's dark theme or Battery Saver is on</Subtitle>
        </ListItem.Content>
      </ListItem>
      <ListItem onPress={() => isDarkThemeEnabled && toggleTheme()}>
        <RadioButton checked={!isDarkThemeEnabled} />
        <ListItem.Title>Light</ListItem.Title>
      </ListItem>
      <ListItem onPress={() => !isDarkThemeEnabled && toggleTheme()}>
        <RadioButton checked={isDarkThemeEnabled} />
        <ListItem.Title>Dark</ListItem.Title>
      </ListItem>
    </React.Fragment>
  );
};
