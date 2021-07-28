import {AppLocale} from '../store/use-store';
import {getLocalePrefix} from './getLocalePrefix';

export const getLocaleName = (locale: string) => {
  const localePrefix = getLocalePrefix(locale);

  switch (localePrefix) {
    case AppLocale.En:
    case AppLocale.Ru:
      return getLocaleNames()[localePrefix];
    default:
      return 'Unknown language';
  }
};

export const getLocaleNames = () => {
  return {
    [AppLocale.En]: 'English',
    [AppLocale.Ru]: 'Русский',
  };
};
