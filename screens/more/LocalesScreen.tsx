import * as React from 'react';
import {useCallback} from 'react';
import {useTranslation} from 'react-i18next';
import {OptionListItem} from '../../components/ListItem';
import {AppLocale, useStore} from '../../store/use-store';
import {getLocaleName} from '../../utils/getLocaleName';
import {getLocalePrefix} from '../../utils/getLocalePrefix';

const locales: AppLocale[] = [AppLocale.En, AppLocale.Ru];

export interface LocalesScreenProps {}

export const LocalesScreen: React.FC<LocalesScreenProps> = (props) => {
  const {i18n} = useTranslation();
  const localePrefix = getLocalePrefix(i18n.language);

  const saveLocaleToStore = useStore.use.setLocale();
  const setLocale = useCallback(
    (locale: AppLocale) => {
      i18n.changeLanguage(locale);
      saveLocaleToStore(locale);
    },
    [i18n, saveLocaleToStore],
  );

  return (
    <React.Fragment>
      {locales.map((locale) => (
        <OptionListItem
          key={locale}
          title={getLocaleName(locale)}
          onPress={() => setLocale(locale)}
          checked={localePrefix === locale}
          bottomDivider
        />
      ))}
    </React.Fragment>
  );
};
