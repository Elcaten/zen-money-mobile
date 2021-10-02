import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Localization from 'expo-localization';
import {Appearance} from 'react-native';
import createStore from 'zustand';
import {filterMostRecent} from '../utils/filter';
import {createSelectorHooks} from './create-selectors';
import {persist} from 'zustand/middleware';

export enum AppLocale {
  Ru = 'ru',
  En = 'en',
}

export type AppTheme = 'dark' | 'light' | 'system';

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
  _hasHydrated: boolean;
};

const colorScheme = (Appearance.getColorScheme() as unknown) as 'light' | 'dark';

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
      _hasHydrated: false,
    }),
    {
      name: 'store',
      getStorage: () => AsyncStorage,
      onRehydrateStorage: () => () => {
        useStore.setState({_hasHydrated: true});
      },
    },
  ),
);

export const useStore = createSelectorHooks(useStoreBase);
