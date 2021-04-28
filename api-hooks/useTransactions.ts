import {useCallback, useMemo} from 'react';
import {useQuery, useQueryClient} from 'react-query';
import {fetchTransactions, Transaction} from '../api';
import {TagIconName} from '../api/fetchTags';
import {INSTRUMENTS, TAGS, TRANSACTIONS} from '../auth';
import {useInstruments} from './useInstruments';
import {useTags} from './useTags';

export const useTransactions = () => useQuery(TRANSACTIONS, fetchTransactions);

export type TagModel = {
  title: string;
  icon?: TagIconName | null;
  iconColor?: number | null;
};

export type TransactionModel = Pick<Transaction, 'id' | 'income' | 'outcome' | 'comment'> & {
  tag?: TagModel;
  date: string;
  incomeInstrument: string;
  outcomeInstrument: string;
};

export const useTransactionModels = () => {
  const transactions = useTransactions();
  const tags = useTags();
  const instruments = useInstruments();

  const transactionModels = useMemo<TransactionModel[]>(
    () =>
      transactions.data?.map(({id, tag, date, income, outcome, comment, incomeInstrument, outcomeInstrument}) => {
        const firstTag = tag && tag.length > 0 ? tags.data?.get(tag[0]) : undefined;
        return {
          id,
          tag: firstTag ? {icon: firstTag.icon, title: firstTag.title, iconColor: firstTag.color} : undefined,
          date,
          income,
          outcome,
          comment,
          incomeInstrument: instruments.data?.get(incomeInstrument)?.symbol ?? '',
          outcomeInstrument: instruments.data?.get(outcomeInstrument)?.symbol ?? '',
        };
      }) ?? [],
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
