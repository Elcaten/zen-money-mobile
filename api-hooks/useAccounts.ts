import {useCallback, useMemo} from 'react';
import {useQuery, useQueryClient} from 'react-query';
import {fetchAccounts} from '../api';
import {Account} from '../api/models';
import {ACCOUNTS, INSTRUMENTS} from '../auth';
import {useCurrencyFormat} from '../hooks/useCurrencyFormat';
import {useInstruments} from './useInstruments';

export const useAccounts = () => useQuery(ACCOUNTS, fetchAccounts, {staleTime: Infinity});

export const useAccountDictionary = () => {
  const accounts = useAccounts();

  return useMemo(() => {
    return new Map(accounts.data?.map((a) => [a.id, a]));
  }, [accounts.data]);
};

export type AccountModel = Pick<Account, 'id' | 'title' | 'type' | 'balance'> & {
  balanceFormatted: string;
};

export const useAccountModels = () => {
  const accounts = useAccounts();
  const instruments = useInstruments();
  const formatCurrency = useCurrencyFormat();

  const accountModels = useMemo(() => {
    const models =
      accounts.data?.map<AccountModel>(({id, title, type, balance, instrument}) => {
        const symbol = instruments.data?.get(instrument)?.symbol ?? '';
        return {
          id,
          title,
          type,
          balance,
          balanceFormatted: formatCurrency(Math.abs(balance), symbol),
        };
      }) ?? [];
    return models.sort((m1, m2) => m1.title.localeCompare(m2.title));
  }, [accounts.data, formatCurrency, instruments.data]);

  const queryClient = useQueryClient();

  const invalidate = useCallback(() => {
    queryClient.invalidateQueries(ACCOUNTS);
    queryClient.invalidateQueries(INSTRUMENTS);
  }, [queryClient]);

  return {data: accountModels, isLoading: accounts.isLoading || instruments.isLoading, invalidate};
};
