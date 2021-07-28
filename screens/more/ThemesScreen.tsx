import * as React from 'react';
import {ListItem} from '../../components/ListItem';
import {useThemeNames} from '../../hooks/useThemeName';
import {setThemeSelector, themeSelector, useStore} from '../../store/use-store';
import {RadioButton} from '../components';

export const ThemesScreen: React.FC = () => {
  const setTheme = useStore(setThemeSelector);
  const selectedTheme = useStore(themeSelector);

  const themeNames = useThemeNames().entriesArray();

  return (
    <React.Fragment>
      {themeNames.map(([theme, themeName]) => (
        <ListItem key={theme} onPress={() => setTheme(theme)}>
          <RadioButton checked={theme === selectedTheme} />
          <ListItem.Title>{themeName}</ListItem.Title>
        </ListItem>
      ))}
    </React.Fragment>
  );
};
