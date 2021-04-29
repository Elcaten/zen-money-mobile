import * as React from 'react';
import {useTranslation} from 'react-i18next';
import {Text} from '../components';
import {ListItem} from '../components/ListItem';
import {RadioButton} from './components';
import * as Localization from 'expo-localization';
import {useCallback} from 'react';
import {useStore} from '../store/use-store';

export interface LocalesScreenProps {}

export const LocalesScreen: React.FC<LocalesScreenProps> = (props) => {
  const {i18n} = useTranslation();
  const localPrefix = i18n.language.substring(0, 2);

  const {setLocale: saveLocalToStore} = useStore();
  const setLocale = useCallback(
    (locale: string) => {
      i18n.changeLanguage(locale);
      saveLocalToStore(locale);
    },
    [i18n, saveLocalToStore],
  );

  return (
    <React.Fragment>
      <ListItem onPress={() => setLocale('en')}>
        <RadioButton checked={localPrefix === 'en'} />
        <ListItem.Content>
          <ListItem.Title>English</ListItem.Title>
        </ListItem.Content>
      </ListItem>
      <ListItem onPress={() => setLocale('ru')}>
        <RadioButton checked={localPrefix === 'ru'} />
        <ListItem.Content>
          <ListItem.Title>Русский</ListItem.Title>
        </ListItem.Content>
      </ListItem>
    </React.Fragment>
  );
};
