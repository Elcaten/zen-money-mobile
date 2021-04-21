import {useMemo} from 'react';
import {useQuery} from 'react-query';
import {fetchAccounts, Account} from '../api';
import {ACCOUNTS} from '../auth';
import {useInstruments} from './useInstruments';

export const useAccounts = () => useQuery(ACCOUNTS, fetchAccounts);

export type AccountModel = Pick<Account, 'id' | 'title' | 'type' | 'balance'> & {instrument: string};

export const useAccountModels = () => {
  const accounts = useAccounts();
  const instruments = useInstruments();
  const accountModels = useMemo<AccountModel[]>(
    () =>
      accounts.data?.map(({id, title, type, balance, instrument}) => ({
        id,
        title,
        type,
        balance,
        instrument: instruments.data?.get(instrument)?.symbol ?? '',
      })) ?? [],
    [accounts.data, instruments],
  );
  return {data: accountModels, isLoading: accounts.isLoading || instruments.isLoading};
};
