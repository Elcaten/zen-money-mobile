import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import en_currencies from './assets/locales/en/currencies.json';
import en_main from './assets/locales/en/main.json';
import ru_currencies from './assets/locales/ru/currencies.json';
import ru_main from './assets/locales/ru/main.json';

enum LocaleNamespace {
  Common = 'Common',
  Currencies = 'Currencies',
}

export const resources = {
  en: {
    [LocaleNamespace.Common]: en_main,
    [LocaleNamespace.Currencies]: en_currencies,
  },
  ru: {
    [LocaleNamespace.Common]: ru_main,
    [LocaleNamespace.Currencies]: ru_currencies,
  },
} as const;

export const initI18n = async (language: string) => {
  await i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
      lng: language,
      ns: [LocaleNamespace.Common, LocaleNamespace.Currencies],
      defaultNS: LocaleNamespace.Common,
      resources,
      keySeparator: '.',
      interpolation: {
        escapeValue: false, // react already safes from xss
      },
    });
};
