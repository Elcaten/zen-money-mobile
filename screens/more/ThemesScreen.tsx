import * as React from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet} from 'react-native';
import {ListItem} from '../../components/ListItem';
import {GRAY} from '../../constants/Colors';
import {setThemeSelector, themeSelector, useStore} from '../../store/use-store';
import {RadioButton} from '../components';

const styles = StyleSheet.create({
  subtitle: {
    color: GRAY,
  },
});

export const ThemesScreen: React.FC = () => {
  const setTheme = useStore(setThemeSelector);
  const theme = useStore(themeSelector);
  const {t} = useTranslation();

  return (
    <React.Fragment>
      <ListItem onPress={() => setTheme('system')}>
        <RadioButton checked={theme === 'system'} />
        <ListItem.Content>
          <ListItem.Title>{t('ThemesScreen.SystemDefault')}</ListItem.Title>
          <ListItem.Subtitle style={styles.subtitle}>{t('ThemesScreen.SystemDefaultDescription')}</ListItem.Subtitle>
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
