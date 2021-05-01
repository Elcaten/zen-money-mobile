import * as React from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet} from 'react-native';
import {ListItem} from '../components/ListItem';
import {GRAY} from '../constants/Colors';
import {useStore} from '../store/use-store';
import {RadioButton} from './components';

const styles = StyleSheet.create({
  subtitle: {
    color: GRAY,
  },
});

export const ThemesScreen: React.FC = () => {
  const {setTheme} = useStore();
  const theme = useStore((x) => x.theme);
  const {t} = useTranslation();

  return (
    <React.Fragment>
      <ListItem onPress={() => setTheme('system')}>
        <RadioButton checked={theme === 'system'} />
        <ListItem.Content>
          <ListItem.Title>{t('Screen.Themes.SystemDefault')}</ListItem.Title>
          <ListItem.Subtitle style={styles.subtitle}>{t('Screen.Themes.SystemDefaultDescription')}</ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
      <ListItem onPress={() => setTheme('light')}>
        <RadioButton checked={theme === 'light'} />
        <ListItem.Title>{t('Screen.Themes.Light')}</ListItem.Title>
      </ListItem>
      <ListItem onPress={() => setTheme('dark')}>
        <RadioButton checked={theme === 'dark'} />
        <ListItem.Title>{t('Screen.Themes.Dark')}</ListItem.Title>
      </ListItem>
    </React.Fragment>
  );
};
