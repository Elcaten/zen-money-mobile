import * as SecureStore from 'expo-secure-store';
import createStore from 'zustand';
import {configurePersist} from 'zustand-persist';
import {createSelectorHooks} from './create-selectors';

const {persist, purge} = configurePersist({
  storage: {
    getItem: SecureStore.getItemAsync,
    setItem: SecureStore.setItemAsync,
    removeItem: SecureStore.deleteItemAsync,
  },
  rootKey: 'zen-secure-store', // optional, default value is `root`
});

export type SecureState = {
  tinkoffUsername: string | undefined;
  tinkoffPassword: string | undefined;
  setTinkoffUsername: (value: string | undefined) => void;
  setTinkoffPassword: (value: string | undefined) => void;
};

export const useSecureStoreBase = createStore<SecureState>(
  persist(
    {
      key: 'persist', // required, child key of storage
    },
    (set) => ({
      tinkoffUsername: undefined,
      tinkoffPassword: undefined,
      setTinkoffUsername: (value) => set(() => ({tinkoffUsername: value})),
      setTinkoffPassword: (value) => set(() => ({tinkoffPassword: value})),
    }),
  ),
);

export const useSecureStore = createSelectorHooks(useSecureStoreBase);
