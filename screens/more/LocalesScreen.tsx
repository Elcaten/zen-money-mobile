import * as React from 'react';
import {useCallback} from 'react';
import {useTranslation} from 'react-i18next';
import {ListItem} from '../../components/ListItem';
import {AppLocale, setLocaleSelector, useStore} from '../../store/use-store';
import {getLocaleName} from '../../utils/getLocaleName';
import {getLocalePrefix} from '../../utils/getLocalePrefix';
import {RadioButton} from '../components';

export interface LocalesScreenProps {}

export const LocalesScreen: React.FC<LocalesScreenProps> = (props) => {
  const {i18n} = useTranslation();
  const localePrefix = getLocalePrefix(i18n.language);

  const saveLocaleToStore = useStore(setLocaleSelector);
  const setLocale = useCallback(
    (locale: AppLocale) => {
      i18n.changeLanguage(locale);
      saveLocaleToStore(locale);
    },
    [i18n, saveLocaleToStore],
  );

  return (
    <React.Fragment>
      <ListItem onPress={() => setLocale(AppLocale.En)}>
        <RadioButton checked={localePrefix === AppLocale.En} />
        <ListItem.Content>
          <ListItem.Title>{getLocaleName(AppLocale.En)}</ListItem.Title>
        </ListItem.Content>
      </ListItem>
      <ListItem onPress={() => setLocale(AppLocale.Ru)}>
        <RadioButton checked={localePrefix === AppLocale.Ru} />
        <ListItem.Content>
          <ListItem.Title>{getLocaleName(AppLocale.Ru)}</ListItem.Title>
        </ListItem.Content>
      </ListItem>
    </React.Fragment>
  );
};
