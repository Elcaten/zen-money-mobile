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
  addRecentExpenseAccount: (account: string) => void;
  addRecentIncomeAccount: (account: string) => void;
  addRecentTransferAccount: (account: string) => void;
  biometricUnlock: boolean;
  cardInfo: CardInfo[];
  categoryInfo: CategoryInfo[];
  fastAddTransaction: boolean;
  locale: string;
  lastSyncDate: number | null;
  recentExpenseAccounts: string[];
  recentIncomeAccounts: string[];
  recentTransferAccounts: string[];
  setBiometricUnlock: (value: boolean) => void;
  setCardInfo: (value: CardInfo[]) => void;
  setCategoryInfo: (value: CategoryInfo[]) => void;
  setFastAddTransaction: (value: boolean) => void;
  setLastSyncDate: (value: Date) => void;
  setLocale: (value: AppLocale) => void;
  setTheme: (value: AppTheme) => void;
  setTinkoffPassword: (value: string | undefined) => void;
  setTinkoffUsername: (value: string | undefined) => void;
  theme: AppTheme;
  tinkoffPassword: string | undefined;
  tinkoffUsername: string | undefined;
  _hasHydrated: boolean;
};

const colorScheme = Appearance.getColorScheme() as unknown as 'light' | 'dark';

const useStoreBase = createStore<State>(
  persist(
    (set) => ({
      _hasHydrated: false,
      addRecentExpenseAccount: (value) =>
        set(({recentExpenseAccounts}) => ({recentExpenseAccounts: filterMostRecent(recentExpenseAccounts, value)})),
      addRecentIncomeAccount: (value) =>
        set(({recentIncomeAccounts}) => ({recentIncomeAccounts: filterMostRecent(recentIncomeAccounts, value)})),
      addRecentTransferAccount: (value) =>
        set(({recentIncomeAccounts}) => ({recentTransferAccounts: filterMostRecent(recentIncomeAccounts, value)})),
      biometricUnlock: false,
      cardInfo: [],
      categoryInfo: [],
      fastAddTransaction: false,
      lastSyncDate: 0,
      locale: Localization.locale,
      recentExpenseAccounts: [],
      recentIncomeAccounts: [],
      recentTransferAccounts: [],
      setBiometricUnlock: (value) => set(() => ({biometricUnlock: value})),
      setCardInfo: (value) => set(() => ({cardInfo: value})),
      setCategoryInfo: (value) => set(() => ({categoryInfo: value})),
      setFastAddTransaction: (value) => set(() => ({fastAddTransaction: value})),
      setLastSyncDate: (value) => set(() => ({lastSyncDate: value.getTime()})),
      setLocale: (value) => set(() => ({locale: value})),
      setTheme: (value) => set(() => ({theme: value})),
      setTinkoffPassword: (value) => set(() => ({tinkoffPassword: value})),
      setTinkoffUsername: (value) => set(() => ({tinkoffUsername: value})),
      theme: colorScheme,
      tinkoffPassword: undefined,
      tinkoffUsername: undefined,
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
