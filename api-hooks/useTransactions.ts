import {useCallback, useMemo} from 'react';
import {useQuery, useQueryClient} from 'react-query';
import {fetchTransactions, Transaction} from '../api';
import {INSTRUMENTS, TAGS, TRANSACTIONS} from '../auth';
import {useInstruments} from './useInstruments';
import {useTags} from './useTags';

export const useTransactions = () => useQuery(TRANSACTIONS, fetchTransactions);

export type TransactionModel = Pick<Transaction, 'id' | 'date' | 'income' | 'outcome'> & {
  tag: string;
  incomeInstrument: string;
  outcomeInstrument: string;
};

export const useTransactionModels = () => {
  const transactions = useTransactions();
  const tags = useTags();
  const instruments = useInstruments();

  const transactionModels = useMemo<TransactionModel[]>(
    () =>
      transactions.data?.map(({id, tag, date, income, outcome, incomeInstrument, outcomeInstrument}) => ({
        id,
        tag: tag && tag.length > 0 ? tags.data?.get(tag[0])?.icon ?? 'No category' : 'No category',
        date,
        income,
        outcome,
        incomeInstrument: instruments.data?.get(incomeInstrument)?.symbol ?? '',
        outcomeInstrument: instruments.data?.get(outcomeInstrument)?.symbol ?? '',
      })) ?? [],
    [transactions.data, tags.data, instruments.data],
  );

  const queryClient = useQueryClient();

  const invalidate = useCallback(() => {
    queryClient.invalidateQueries(TRANSACTIONS);
    queryClient.invalidateQueries(INSTRUMENTS);
    queryClient.invalidateQueries(TAGS);
  }, [queryClient]);

  return {data: transactionModels, isLoading: transactions.isLoading || instruments.isLoading, invalidate};
};
