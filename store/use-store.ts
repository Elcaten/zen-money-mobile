import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Localization from 'expo-localization';
import {Appearance} from 'react-native';
import createStore from 'zustand';
import {configurePersist} from 'zustand-persist';
import {createSelectorHooks} from './create-selectors';

const {persist, purge} = configurePersist({
  storage: AsyncStorage,
  rootKey: 'root', // optional, default value is `root`
});

export enum AppLocale {
  Ru = 'ru',
  En = 'en',
}

export type AppTheme = 'dark' | 'light' | 'system';

export type State = {
  theme: AppTheme;
  setTheme: (value: AppTheme) => void;
  locale: string;
  setLocale: (value: AppLocale) => void;
  biometricUnlock: boolean;
  setBiometricUnlock: (value: boolean) => void;
  fastAddTransaction: boolean;
  setFastAddTransaction: (value: boolean) => void;
};

const colorScheme = (Appearance.getColorScheme() as unknown) as 'light' | 'dark';

const useStoreBase = createStore<State>(
  persist(
    {
      key: 'persist', // required, child key of storage
      allowlist: [/*'serverTimestamp', 'zenMoneyToken', */ 'locale', 'theme', 'fastAddTransaction'],
    },
    (set) => ({
      theme: colorScheme,
      setTheme: (value) => set(() => ({theme: value})),
      locale: Localization.locale,
      setLocale: (value) => set(() => ({locale: value})),
      fastAddTransaction: false,
      setFastAddTransaction: (value) => set(() => ({fastAddTransaction: value})),
      biometricUnlock: false,
      setBiometricUnlock: (value) => set(() => ({biometricUnlock: value})),
    }),
  ),
);

export const useStore = createSelectorHooks(useStoreBase);
