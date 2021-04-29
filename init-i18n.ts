import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import en_main from './assets/locales/en/main.json';
import ru_main from './assets/locales/ru/main.json';

enum LocaleNamespace {
  Common = 'Common',
}

export const resources = {
  en: {
    [LocaleNamespace.Common]: en_main,
  },
  ru: {
    [LocaleNamespace.Common]: ru_main,
  },
} as const;

export const initI18n = async (language: string) => {
  await i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
      lng: language,
      ns: [LocaleNamespace.Common],
      defaultNS: LocaleNamespace.Common,
      resources,
      keySeparator: '.',
      interpolation: {
        escapeValue: false, // react already safes from xss
      },
    });
};
