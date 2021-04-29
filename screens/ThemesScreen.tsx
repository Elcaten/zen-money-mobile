import * as React from 'react';
import styled from 'styled-components/native';
import {RadioboxMarkedIcon, RadioboxBlankIcon} from '../components';
import {ListItem} from '../components/ListItem';
import {useThemeToggle} from '../themes';

const RadioButton: React.FC<Parameters<typeof ListItem.CheckBox>['0']> = (props) => {
  return <ListItem.CheckBox {...props} checkedIcon={<RadioboxMarkedIcon />} uncheckedIcon={<RadioboxBlankIcon />} />;
};

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
