import * as React from 'react';
import {useCallback, useMemo, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {ScrollView, StyleSheet} from 'react-native';
import {useQueryClient} from 'react-query';
import {
  TransactionModel,
  useDeleteTransaction,
  useMutateExpenseTransaction,
  useMutateIncomeTransaction,
  useMutateTransferTransaction,
  useTags,
  useTransactionModels,
} from '../../../api-hooks';
import {QueryKeys} from '../../../api-hooks/query-keys';
import {Card} from '../../../components/Card';
import {useStore} from '../../../store/use-store';
import {EditTransactionScreenProps} from '../../../types';
import {confirmDelete, fromApiDate, showToast} from '../../../utils';
import {TransactionType} from '../transaction-type';
import {IncomeExpenseEditor, IncomeExpenseTransaction} from './IncomeExpenseEditor';
import {TransactionTypePicker} from './TransactionTypePicker';
import {TransferEditor, TransferTransaction} from './TransferEditor';

export const EditTransactionScreen: React.FC<EditTransactionScreenProps> = ({route, navigation}) => {
  const {data: transactions} = useTransactionModels();
  const transactionId = route.params.transactionId;
  const transaction = transactions.find((tr) => tr.id === transactionId);

  const initialType = transaction ? getTransactionType(transaction) : route.params.transactionType!;
  const [transactionType, setTransactionType] = useState(initialType);
  const {t} = useTranslation();
  const queryClient = useQueryClient();

  const {data: tagDict} = useTags();
  const tags = useMemo(() => (tagDict.values ? Array.from(tagDict.values()) : []), [tagDict]);
  const incomeTags = useMemo(() => tags.filter((tag) => tag.showIncome), [tags]);
  const expenseTags = useMemo(() => tags.filter((tag) => tag.showOutcome), [tags]);

  const {mutateAsync: mutateIncomeAsync, isLoading: isMutatinIncome} = useMutateIncomeTransaction();
  const {mutateAsync: mutateExpenseAsync, isLoading: isMutatingExpense} = useMutateExpenseTransaction();
  const {mutateAsync: mutateTransferAsync, isLoading: isMutatingTransfer} = useMutateTransferTransaction();
  const {deleteAsync, isDeleting} = useDeleteTransaction();
  const addRecentExpenseAccount = useStore.use.addRecentExpenseAccount();
  const addRecentIncomeAccount = useStore.use.addRecentIncomeAccount();
  const addRecentTransferAccount = useStore.use.addRecentTransferAccount();
  const recentExpenseAccounts = useStore.use.recentExpenseAccounts();
  const recentIncomeAccounts = useStore.use.recentIncomeAccounts();
  const recentTransferAccounts = useStore.use.recentTransferAccounts();

  const onTransactionSave = useCallback(
    async (success: boolean) => {
      if (success) {
        showToast(t('EditTransactionScreen.TransactionSaved'));
        if (navigation.isFocused()) {
          navigation.pop();
        }
        queryClient.invalidateQueries(QueryKeys.Transactions);
        queryClient.invalidateQueries(QueryKeys.Accounts);
      } else {
        showToast(t('Error.UnexpectedError'));
      }
    },
    [navigation, queryClient, t],
  );

  const saveIncomeTransaction = useCallback(
    async (tr: IncomeExpenseTransaction) => {
      const {success} = await mutateIncomeAsync(tr);
      onTransactionSave(success);
      if (success) {
        addRecentIncomeAccount(tr.account.id);
      }
    },
    [addRecentIncomeAccount, mutateIncomeAsync, onTransactionSave],
  );

  const saveExpenseTransaction = useCallback(
    async (tr: IncomeExpenseTransaction) => {
      const {success} = await mutateExpenseAsync(tr);
      onTransactionSave(success);
      if (success) {
        addRecentExpenseAccount(tr.account.id);
      }
    },
    [addRecentExpenseAccount, mutateExpenseAsync, onTransactionSave],
  );

  const saveTransferTransaction = useCallback(
    async (tr: TransferTransaction) => {
      const {success} = await mutateTransferAsync(tr);
      onTransactionSave(success);
      if (success) {
        addRecentTransferAccount(tr.incomeAccount.id);
        addRecentTransferAccount(tr.outcomeAccount.id);
      }
    },
    [addRecentTransferAccount, mutateTransferAsync, onTransactionSave],
  );

  const onDelete = useCallback(async () => {
    const confirmed = await confirmDelete(
      t('EditTransactionScreen.DeleteTransactionTitle'),
      t('EditTransactionScreen.DeleteTransactionMessage'),
    );

    if (confirmed && transactionId != null) {
      await deleteAsync(transactionId);
      showToast(t('EditTransactionScreen.DeleteSuccessMessage'));
      if (navigation.isFocused()) {
        navigation.pop();
      }
      queryClient.invalidateQueries(QueryKeys.Transactions);
    }
  }, [deleteAsync, navigation, queryClient, t, transactionId]);

  const renderEditor = () => {
    switch (transactionType) {
      case TransactionType.Income:
        return (
          <IncomeExpenseEditor
            defaultValue={transaction ? toIncomeTransaction(transaction) : undefined}
            tags={incomeTags}
            recentAccounts={recentIncomeAccounts}
            onSubmit={saveIncomeTransaction}
            onDelete={onDelete}
            disabled={isMutatinIncome || isDeleting}
          />
        );
      case TransactionType.Expense:
        return (
          <IncomeExpenseEditor
            defaultValue={transaction ? toExpenseTransaction(transaction) : undefined}
            tags={expenseTags}
            recentAccounts={recentExpenseAccounts}
            onSubmit={saveExpenseTransaction}
            onDelete={onDelete}
            disabled={isMutatingExpense || isDeleting}
          />
        );
      case TransactionType.Transfer:
        return (
          <TransferEditor
            defaultValue={transaction ? toTransferTransaction(transaction) : undefined}
            recentAccounts={recentTransferAccounts}
            onSubmit={saveTransferTransaction}
            onDelete={onDelete}
            disabled={isMutatingTransfer || isDeleting}
          />
        );
      default:
        return <React.Fragment />;
    }
  };

  return (
    <Card style={styles.wrapper}>
      <TransactionTypePicker onSelect={setTransactionType} selectedType={transactionType} />
      <ScrollView style={styles.editor}>{renderEditor()}</ScrollView>
    </Card>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  editor: {
    flex: 1,
  },
});

const getTransactionType = (tr: TransactionModel): TransactionType => {
  if (tr.incomeAccount?.id !== tr.outcomeAccount?.id) {
    return TransactionType.Transfer;
  } else if (tr.incomeAccount?.id === tr.outcomeAccount?.id && tr.income) {
    return TransactionType.Income;
  }
  return TransactionType.Expense;
};

const toTransferTransaction = (tr: TransactionModel): TransferTransaction => {
  return {
    id: tr.id,
    outcome: tr.outcome.toString(10),
    outcomeAccount: tr.outcomeAccount!,
    income: tr.income.toString(10),
    incomeAccount: tr.incomeAccount!,
    date: fromApiDate(tr.date).toDate(),
    comment: tr.comment ?? null,
  };
};

const toExpenseTransaction = (tr: TransactionModel): IncomeExpenseTransaction => {
  return {
    id: tr.id,
    amount: tr.outcome.toString(10),
    account: tr.outcomeAccount!,
    tag: tr.tag?.id ?? null,
    date: fromApiDate(tr.date).toDate(),
    comment: tr.comment ?? null,
  };
};

const toIncomeTransaction = (tr: TransactionModel): IncomeExpenseTransaction => {
  return {
    id: tr.id,
    amount: tr.income.toString(10),
    account: tr.incomeAccount!,
    tag: tr.tag?.id ?? null,
    date: fromApiDate(tr.date).toDate(),
    comment: tr.comment ?? null,
  };
};
