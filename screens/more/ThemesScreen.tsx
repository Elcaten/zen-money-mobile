import * as React from 'react';
import {useTranslation} from 'react-i18next';
import {ListItem} from '../../components/ListItem';
import {setThemeSelector, themeSelector, useStore} from '../../store/use-store';
import {useNavigatorThemeColors} from '../../themes';
import {RadioButton} from '../components';

export const ThemesScreen: React.FC = () => {
  const setTheme = useStore(setThemeSelector);
  const theme = useStore(themeSelector);
  const {t} = useTranslation();
  const {secondaryText} = useNavigatorThemeColors();

  return (
    <React.Fragment>
      <ListItem onPress={() => setTheme('system')}>
        <RadioButton checked={theme === 'system'} />
        <ListItem.Content>
          <ListItem.Title>{t('ThemesScreen.SystemDefault')}</ListItem.Title>
          <ListItem.Subtitle style={{color: secondaryText}}>
            {t('ThemesScreen.SystemDefaultDescription')}
          </ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
      <ListItem onPress={() => setTheme('light')}>
        <RadioButton checked={theme === 'light'} />
        <ListItem.Title>{t('ThemesScreen.Light')}</ListItem.Title>
      </ListItem>
      <ListItem onPress={() => setTheme('dark')}>
        <RadioButton checked={theme === 'dark'} />
        <ListItem.Title>{t('ThemesScreen.Dark')}</ListItem.Title>
      </ListItem>
    </React.Fragment>
  );
};
