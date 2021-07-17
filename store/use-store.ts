import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Localization from 'expo-localization';
import {Appearance} from 'react-native';
import createStore from 'zustand';
import {configurePersist} from 'zustand-persist';

const {persist, purge} = configurePersist({
  storage: AsyncStorage,
  rootKey: 'root', // optional, default value is `root`
});

export enum AppLocale {
  Ru = 'ru',
  En = 'en',
}

export type State = {
  theme: 'dark' | 'light' | 'system';
  setTheme: (value: 'dark' | 'light' | 'system') => void;
  // serverTimestamp: number;
  // setServerTimestamp: (value: number) => void;
  // zenMoneyToken: AuthToken | null;
  // setZenMoneyToken: (value: AuthToken | null) => void;
  locale: string;
  setLocale: (value: AppLocale) => void;
  fastAddTransaction: boolean;
  setFastAddTransaction: (value: boolean) => void;
};

const colorScheme = (Appearance.getColorScheme() as unknown) as 'light' | 'dark';

export const useStore = createStore<State>(
  persist(
    {
      key: 'persist', // required, child key of storage
      allowlist: [/*'serverTimestamp', 'zenMoneyToken', */ 'locale', 'theme', 'fastAddTransaction'],
    },
    (set) => ({
      theme: colorScheme,
      setTheme: (value) => set(() => ({theme: value})),
      // serverTimestamp: 0,
      // zenMoneyToken: null,
      locale: Localization.locale,
      setLocale: (value) => set(() => ({locale: value})),
      fastAddTransaction: false,
      setFastAddTransaction: (value) => set(() => ({fastAddTransaction: value})),
      // setServerTimestamp: (value) => set(() => ({serverTimestamp: value})),
      // setZenMoneyToken: (value) => set(() => ({zenMoneyToken: value})),
    }),
  ),
);

export const themeSelector = (x: State) => x.theme;
export const setThemeSelector = (x: State) => x.setTheme;
export const localeSelector = (x: State) => x.locale;
export const setLocaleSelector = (x: State) => x.setLocale;
export const fastAddTransactionSelector = (x: State) => x.fastAddTransaction;
export const setFastAddTransactionSelector = (x: State) => x.setFastAddTransaction;
