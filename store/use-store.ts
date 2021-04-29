import {configurePersist} from 'zustand-persist';
import createStore from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthToken} from '../auth';
import * as Localization from 'expo-localization';

const {persist, purge} = configurePersist({
  storage: AsyncStorage,
  rootKey: 'root', // optional, default value is `root`
});

export type State = {
  serverTimestamp: number;
  setServerTimestamp: (value: number) => void;
  zenMoneyToken: AuthToken | null;
  locale: string;
  setLocale: (value: string) => void;
};

export const useStore = createStore<State>(
  persist(
    {
      key: 'persist', // required, child key of storage
      allowlist: ['serverTimestamp', 'zenMoneyToken', 'locale'],
    },
    (set) => ({
      serverTimestamp: 0,
      setServerTimestamp: (value: number) => set(() => ({serverTimestamp: value})),
      zenMoneyToken: null,
      setZenMoneyToken: (value: AuthToken | null) => set(() => ({zenMoneyToken: value})),
      locale: Localization.locale,
      setLocale: (value: string) => set(() => ({locale: value})),
    }),
  ),
);
