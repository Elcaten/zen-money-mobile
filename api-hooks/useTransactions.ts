import {useCallback, useMemo} from 'react';
import {useQuery, useQueryClient} from 'react-query';
import {fetchTransactions, Transaction} from '../api';
import {TagIconName} from '../api/fetchTags';
import {INSTRUMENTS, TAGS, TRANSACTIONS} from '../auth';
import {useAccountDictionary, useAccounts} from './useAccounts';
import {useInstruments} from './useInstruments';
import {useTags} from './useTags';

export const useTransactions = () => useQuery(TRANSACTIONS, fetchTransactions);

export type TagModel = {
  title: string;
  icon?: TagIconName | null;
  iconColor?: number | null;
};

export interface TransactionModel {
  id: string;
  date: string;
  income: string;
  incomeAccount?: string;
  outcomeAccount?: string;
  outcome: string;
  tag?: TagModel;
  comment?: string;
}

function formatCurrency(amount: number, symbol: string) {
  return amount ? `${symbol}${Math.abs(amount)}` : '';
}

export const useTransactionModels = () => {
  const accounts = useAccountDictionary();
  const instruments = useInstruments();
  const tags = useTags();
  const transactions = useTransactions();

  const transactionModels = useMemo<TransactionModel[]>(
    () =>
      transactions.data?.map((transaction) => {
        const firstTag = transaction.tag && transaction.tag.length > 0 ? tags.data?.get(transaction.tag[0]) : undefined;
        const incomeSymbol = instruments.data?.get(transaction.incomeInstrument)?.symbol ?? '';
        const outcomeSymbol = instruments.data?.get(transaction.outcomeInstrument)?.symbol ?? '';
        return {
          id: transaction.id,
          tag: firstTag ? {icon: firstTag.icon, title: firstTag.title, iconColor: firstTag.color} : undefined,
          date: transaction.date,
          income: formatCurrency(transaction.income, incomeSymbol),
          incomeAccount: accounts.get(transaction.incomeAccount)?.title,
          outcomeAccount: accounts.get(transaction.outcomeAccount)?.title,
          outcome: formatCurrency(transaction.outcome, outcomeSymbol),
          comment: transaction.comment ?? undefined,
        };
      }) ?? [],
    [transactions.data, tags.data, instruments.data, accounts],
  );

  const queryClient = useQueryClient();

  const invalidate = useCallback(() => {
    queryClient.invalidateQueries(TRANSACTIONS);
    queryClient.invalidateQueries(INSTRUMENTS);
    queryClient.invalidateQueries(TAGS);
  }, [queryClient]);

  return {data: transactionModels, isLoading: transactions.isLoading || instruments.isLoading, invalidate};
};
