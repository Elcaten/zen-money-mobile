import {useTranslation} from 'react-i18next';
import {AppTheme} from '../store/use-store';

export const useThemeName = (theme: AppTheme) => {
  const names = useThemeNames();
  return names.get(theme);
};

export const useThemeNames = () => {
  const {t} = useTranslation();

  return new Map<AppTheme, string>([
    ['system', t('ThemesScreen.SystemDefault')],
    ['light', t('ThemesScreen.Light')],
    ['dark', t('ThemesScreen.Dark')],
  ]);
};
