import {configurePersist} from 'zustand-persist';
import createStore from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthToken} from '../auth';

const {persist, purge} = configurePersist({
  storage: AsyncStorage,
  rootKey: 'root', // optional, default value is `root`
});

export type State = {
  serverTimestamp: number;
  setServerTimestamp: (value: number) => void;
  zenMoneyToken: AuthToken | null;
};

export const useStore = createStore<State>(
  persist(
    {
      key: 'persist', // required, child key of storage
      allowlist: ['serverTimestamp', 'zenMoneyToken'],
    },
    (set) => ({
      serverTimestamp: 0,
      setServerTimestamp: (value: number) => set(() => ({serverTimestamp: value})),
      zenMoneyToken: null,
      setZenMoneyToken: (value: AuthToken | null) => set(() => ({zenMoneyToken: value})),
    }),
  ),
);
