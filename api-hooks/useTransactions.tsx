import React, {useCallback, useMemo} from 'react';
import {useQuery, useQueryClient} from 'react-query';
import {fetchTransactions} from '../api';
import {TagIconName} from '../api/models';
import {TRANSACTIONS} from '../auth';
import {useAccountDictionary} from './useAccounts';
import {useInstruments} from './useInstruments';
import {useTags} from './useTags';

const useTransactions = () => useQuery(TRANSACTIONS, fetchTransactions, {staleTime: Infinity});

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

export type TransactionModelsInfo = ReturnType<typeof useTransactionModels>;

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
    instruments.invalidate();
    tags.invalidate();
  }, [instruments, queryClient, tags]);

  return {data: transactionModels, isLoading: transactions.isLoading || instruments.isLoading, invalidate};
};

export interface WithTransactionModelsProps {
  transactionModels: TransactionModelsInfo;
}

export function withTransactionModels<T extends WithTransactionModelsProps = WithTransactionModelsProps>(
  WrappedComponent: React.ComponentType<T>,
) {
  const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';

  const ComponentWithTheme = (props: Omit<T, keyof WithTransactionModelsProps>) => {
    const transactionModels = useTransactionModels();

    return <WrappedComponent {...(props as T)} transactionModels={transactionModels} />;
  };

  ComponentWithTheme.displayName = `withTransactionModels(${displayName})`;

  return ComponentWithTheme;
}
