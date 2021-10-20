import * as React from 'react';
import {OptionListItem} from '../../components/ListItem';
import {useThemeNames} from '../../hooks/useThemeName';
import {useStore} from '../../store/use-store';

export const ThemesScreen: React.FC = () => {
  const setTheme = useStore.use.setTheme();
  const selectedTheme = useStore.use.theme();

  const themeNames = useThemeNames().entriesArray();

  return (
    <React.Fragment>
      {themeNames.map(([theme, themeName]) => (
        <OptionListItem
          key={theme}
          title={themeName}
          onPress={() => setTheme(theme)}
          checked={theme === selectedTheme}
          bottomDivider
        />
      ))}
    </React.Fragment>
  );
};
