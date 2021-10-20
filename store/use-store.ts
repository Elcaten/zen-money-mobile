import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Localization from 'expo-localization';
import * as SecureStore from 'expo-secure-store';
import {Appearance} from 'react-native';
import createStore from 'zustand';
import {filterMostRecent} from '../utils/filter';
import {ENCRYPTION_KEY_PERSIST_KEY} from '../utils/manifest-extra';
import {decrypt, encrypt} from './aes';
import {createSelectorHooks} from './create-selectors';

import {persist} from 'zustand/middleware';

export enum AppLocale {
  Ru = 'ru',
  En = 'en',
}

export type AppTheme = 'dark' | 'light' | 'system';

export interface CardInfo {
  cardNumber: string;
  accountId?: string;
  accountTitle?: string;
  excludeFromSync?: boolean;
}
export interface CategoryInfo {
  categoryId: string;
  categoryName: string;
  tagId?: string;
  tagTitle?: string;
}

export type State = {
  recentExpenseAccounts: string[];
  addRecentExpenseAccount: (account: string) => void;
  recentIncomeAccounts: string[];
  addRecentIncomeAccount: (account: string) => void;
  recentTransferAccounts: string[];
  addRecentTransferAccount: (account: string) => void;
  theme: AppTheme;
  setTheme: (value: AppTheme) => void;
  locale: string;
  setLocale: (value: AppLocale) => void;
  biometricUnlock: boolean;
  setBiometricUnlock: (value: boolean) => void;
  fastAddTransaction: boolean;
  setFastAddTransaction: (value: boolean) => void;
  cardInfo: CardInfo[];
  setCardInfo: (value: CardInfo[]) => void;
  categoryInfo: CategoryInfo[];
  setCategoryInfo: (value: CategoryInfo[]) => void;
  tinkoffUsername: string | undefined;
  tinkoffPassword: string | undefined;
  setTinkoffUsername: (value: string | undefined) => void;
  setTinkoffPassword: (value: string | undefined) => void;
  _hasHydrated: boolean;
};

const colorScheme = Appearance.getColorScheme() as unknown as 'light' | 'dark';

const useStoreBase = createStore<State>(
  persist(
    (set) => ({
      recentExpenseAccounts: [],
      addRecentExpenseAccount: (value) =>
        set(({recentExpenseAccounts}) => ({recentExpenseAccounts: filterMostRecent(recentExpenseAccounts, value)})),
      recentIncomeAccounts: [],
      addRecentIncomeAccount: (value) =>
        set(({recentIncomeAccounts}) => ({recentIncomeAccounts: filterMostRecent(recentIncomeAccounts, value)})),
      recentTransferAccounts: [],
      addRecentTransferAccount: (value) =>
        set(({recentIncomeAccounts}) => ({recentTransferAccounts: filterMostRecent(recentIncomeAccounts, value)})),
      theme: colorScheme,
      setTheme: (value) => set(() => ({theme: value})),
      locale: Localization.locale,
      setLocale: (value) => set(() => ({locale: value})),
      fastAddTransaction: false,
      setFastAddTransaction: (value) => set(() => ({fastAddTransaction: value})),
      biometricUnlock: false,
      setBiometricUnlock: (value) => set(() => ({biometricUnlock: value})),
      cardInfo: [],
      setCardInfo: (value) => set(() => ({cardInfo: value})),
      categoryInfo: [],
      setCategoryInfo: (value) => set(() => ({categoryInfo: value})),
      tinkoffUsername: undefined,
      tinkoffPassword: undefined,
      setTinkoffUsername: (value) => set(() => ({tinkoffUsername: value})),
      setTinkoffPassword: (value) => set(() => ({tinkoffPassword: value})),
      _hasHydrated: false,
    }),
    {
      name: 'store',
      getStorage: () => AsyncStorage,
      serialize: async (state) => {
        const str = JSON.stringify(state);
        const {encryptionKeyHex, encryptedTextHex} = await encrypt(str);
        await SecureStore.setItemAsync(ENCRYPTION_KEY_PERSIST_KEY, encryptionKeyHex);
        return encryptedTextHex;
      },
      deserialize: async (enchryptedHex) => {
        const encryptionKey = await SecureStore.getItemAsync(ENCRYPTION_KEY_PERSIST_KEY);
        return encryptionKey && enchryptedHex ? JSON.parse(decrypt(enchryptedHex, encryptionKey)) : {state: {}};
      },
      onRehydrateStorage: () => () => {
        useStore.setState({_hasHydrated: true});
      },
    },
  ),
);

export const useStore = createSelectorHooks(useStoreBase);
