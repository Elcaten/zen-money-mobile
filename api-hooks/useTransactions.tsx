import React, {useCallback, useMemo} from 'react';
import {useQuery, useQueryClient} from 'react-query';
import {fetchTransactions} from '../api';
import {TagIconName, Transaction} from '../api/models';
import {TRANSACTIONS} from '../auth';
import {useCurrencyFormat} from '../hooks/useCurrencyFormat';
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
  income: number;
  incomeFormatted: string;
  incomeAccount?: string;
  outcomeAccount?: string;
  outcome: number;
  outcomeFormatted: string;
  tag?: TagModel;
  comment?: string;
  changed: number;
}

export type TransactionModelsInfo = ReturnType<typeof useTransactionModels>;

export const useTransactionModels = () => {
  const accounts = useAccountDictionary();
  const instruments = useInstruments();
  const tags = useTags();
  const transactions = useTransactions();
  const formatCurrency = useCurrencyFormat();

  const transactionModels = useMemo<TransactionModel[]>(
    () =>
      transactions.data
        ?.filter((transaction) => !transaction.deleted)
        .map((transaction) => {
          const firstTag =
            transaction.tag && transaction.tag.length > 0 ? tags.data?.get(transaction.tag[0]) : undefined;
          const incomeSymbol = instruments.data?.get(transaction.incomeInstrument)?.symbol ?? '';
          const outcomeSymbol = instruments.data?.get(transaction.outcomeInstrument)?.symbol ?? '';
          return {
            id: transaction.id,
            tag: firstTag ? {icon: firstTag.icon, title: firstTag.title, iconColor: firstTag.color} : undefined,
            date: transaction.date,
            income: transaction.income,
            incomeFormatted: formatCurrency(transaction.income, incomeSymbol, 0),
            incomeAccount: accounts.get(transaction.incomeAccount)?.title,
            outcomeAccount: accounts.get(transaction.outcomeAccount)?.title,
            outcome: transaction.outcome,
            outcomeFormatted: formatCurrency(transaction.outcome, outcomeSymbol, 0),
            comment: transaction.comment ?? undefined,
            changed: transaction.changed,
          };
        }) ?? [],
    [transactions.data, tags.data, instruments.data, formatCurrency, accounts],
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

  const ComponentWithTransactionModels = (props: Omit<T, keyof WithTransactionModelsProps>) => {
    const transactionModels = useTransactionModels();

    return <WrappedComponent {...(props as T)} transactionModels={transactionModels} />;
  };

  ComponentWithTransactionModels.displayName = `withTransactionModels(${displayName})`;

  return ComponentWithTransactionModels;
}
