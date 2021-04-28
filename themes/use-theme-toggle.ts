import {useCallback} from 'react';
import {DarkElementsTheme, DefaultElementsTheme, useElementsTheme} from './elements-themes';
import {DarkNavigatorTheme, DefaultNavigatorTheme, useNavigatorTheme} from './navigator-themes';

export const useThemeToggle = () => {
  const {navigatorTheme, setNavigatorTheme} = useNavigatorTheme();
  const isDarkThemeEnabled = navigatorTheme.dark;
  const {setElementsTheme} = useElementsTheme();

  const toggleTheme = useCallback(() => {
    if (isDarkThemeEnabled) {
      setNavigatorTheme(DefaultNavigatorTheme);
      setElementsTheme(DefaultElementsTheme);
    } else {
      setNavigatorTheme(DarkNavigatorTheme);
      setElementsTheme(DarkElementsTheme);
    }
  }, [isDarkThemeEnabled, setElementsTheme, setNavigatorTheme]);

  return {isDarkThemeEnabled, toggleTheme};
};
