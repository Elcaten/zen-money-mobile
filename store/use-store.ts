import {configurePersist} from 'zustand-persist';
import createStore from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthToken} from '../auth';
import * as Localization from 'expo-localization';
import {Appearance, ColorSchemeName} from 'react-native';

const {persist, purge} = configurePersist({
  storage: AsyncStorage,
  rootKey: 'root', // optional, default value is `root`
});

export type State = {
  theme: 'dark' | 'light' | 'system';
  setTheme: (value: 'dark' | 'light' | 'system') => void;
  serverTimestamp: number;
  setServerTimestamp: (value: number) => void;
  zenMoneyToken: AuthToken | null;
  setZenMoneyToken: (value: AuthToken | null) => void;
  locale: string;
  setLocale: (value: string) => void;
};

const colorScheme = (Appearance.getColorScheme() as unknown) as 'light' | 'dark';

export const useStore = createStore<State>(
  persist(
    {
      key: 'persist', // required, child key of storage
      allowlist: ['serverTimestamp', 'zenMoneyToken', 'locale', 'theme'],
    },
    (set) => ({
      theme: colorScheme,
      serverTimestamp: 0,
      zenMoneyToken: null,
      locale: Localization.locale,
      setTheme: (value) => set(() => ({theme: value})),
      setServerTimestamp: (value) => set(() => ({serverTimestamp: value})),
      setZenMoneyToken: (value) => set(() => ({zenMoneyToken: value})),
      setLocale: (value) => set(() => ({locale: value})),
    }),
  ),
);
