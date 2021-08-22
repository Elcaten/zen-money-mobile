import React, {useCallback, useMemo} from 'react';
import {useQuery, useQueryClient} from 'react-query';
import {fetchTransactions} from '../api';
import {TagIconName} from '../api/models';
import {useCurrencyFormat} from '../hooks/useCurrencyFormat';
import {QueryKeys} from './query-keys';
import {useAccountDictionary} from './useAccounts';
import {useInstruments} from './useInstruments';
import {useTags} from './useTags';

export const useTransactions = () => useQuery(QueryKeys.Transactions, fetchTransactions, {staleTime: Infinity});

export type TagModel = {
  id: string;
  title: string;
  icon?: TagIconName | null;
  iconColor?: number | null;
};

export interface TransactionModel {
  id: string;
  date: string;
  income: number;
  incomeFormatted: string;
  incomeAccount?: {
    id: string;
    title: string;
    instrumentRate: number | null;
  };
  outcomeAccount?: {
    id: string;
    title: string;
    instrumentRate: number | null;
  };
  outcome: number;
  outcomeFormatted: string;
  tag?: TagModel;
  parentTag?: TagModel;
  comment?: string;
  changed: number;
  created: number;
}

export type TransactionModelsInfo = ReturnType<typeof useTransactionModels>;

export const useTransactionModels = () => {
  const accounts = useAccountDictionary();
  const instruments = useInstruments();
  const tags = useTags();
  const transactions = useTransactions();
  const formatCurrency = useCurrencyFormat();

  const transactionModels = useMemo(
    () =>
      transactions.data
        ?.filter((transaction) => !transaction.deleted)
        .map<TransactionModel>((transaction) => {
          const firstTag =
            transaction.tag && transaction.tag.length > 0 ? tags.data?.get(transaction.tag[0]) : undefined;
          const parenTag = firstTag?.parent ? tags.data?.get(firstTag.parent) : firstTag;
          const incomeInstrument = instruments.data?.get(transaction.incomeInstrument);
          const incomeSymbol = incomeInstrument?.symbol ?? '';
          const outcomeInstrument = instruments.data?.get(transaction.outcomeInstrument);
          const outcomeSymbol = outcomeInstrument?.symbol ?? '';
          const incomeAccount = accounts.get(transaction.incomeAccount);
          const outcomeAccount = accounts.get(transaction.outcomeAccount);
          return {
            id: transaction.id,
            tag: firstTag
              ? {icon: firstTag.icon, title: firstTag.title, iconColor: firstTag.color, id: firstTag.id}
              : undefined,
            parentTag: parenTag
              ? {icon: parenTag.icon, title: parenTag.title, iconColor: parenTag.color, id: parenTag.id}
              : undefined,
            date: transaction.date,
            income: transaction.income,
            incomeFormatted: formatCurrency(transaction.income, incomeSymbol, 0),
            incomeAccount: incomeAccount
              ? {id: incomeAccount.id, title: incomeAccount.title, instrumentRate: incomeInstrument?.rate ?? null}
              : undefined,
            outcomeAccount: outcomeAccount
              ? {id: outcomeAccount.id, title: outcomeAccount.title, instrumentRate: outcomeInstrument?.rate ?? null}
              : undefined,
            outcome: transaction.outcome,
            outcomeFormatted: formatCurrency(transaction.outcome, outcomeSymbol, 0),
            comment: transaction.comment ?? undefined,
            changed: transaction.changed,
            created: transaction.created,
          };
        }) ?? [],
    [transactions.data, tags.data, instruments.data, formatCurrency, accounts],
  );

  const queryClient = useQueryClient();

  const invalidate = useCallback(() => {
    queryClient.invalidateQueries(QueryKeys.Transactions);
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
