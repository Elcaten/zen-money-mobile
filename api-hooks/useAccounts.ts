import {useCallback, useMemo} from 'react';
import {useQuery, useQueryClient} from 'react-query';
import {fetchAccounts, Account} from '../api';
import {ACCOUNTS, INSTRUMENTS} from '../auth';
import {useInstruments} from './useInstruments';

export const useAccounts = () => useQuery(ACCOUNTS, fetchAccounts);

export const useAccountDictionary = () => {
  const accounts = useAccounts();

  return useMemo(() => {
    return new Map(accounts.data?.map((a) => [a.id, a]));
  }, [accounts.data]);
};

export type AccountModel = Pick<Account, 'id' | 'title' | 'type' | 'balance'> & {instrument: string};

export const useAccountModels = () => {
  const accounts = useAccounts();
  const instruments = useInstruments();

  const accountModels = useMemo<AccountModel[]>(
    () =>
      accounts.data?.map(({id, title, type, balance, instrument}) => {
        const symbol = instruments.data?.get(instrument)?.symbol ?? '';
        return {
          id,
          title,
          type,
          balance,
          instrument: symbol,
        };
      }) ?? [],
    [accounts.data, instruments],
  );

  const queryClient = useQueryClient();

  const invalidate = useCallback(() => {
    queryClient.invalidateQueries(ACCOUNTS);
    queryClient.invalidateQueries(INSTRUMENTS);
  }, [queryClient]);

  return {data: accountModels, isLoading: accounts.isLoading || instruments.isLoading, invalidate};
};
