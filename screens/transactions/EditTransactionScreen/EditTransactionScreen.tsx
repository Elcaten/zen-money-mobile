import * as React from 'react';
import {useCallback, useMemo, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {ScrollView, StyleSheet} from 'react-native';
import {useQueryClient} from 'react-query';
import {
  useMutateExpenseTransaction,
  useMutateIncomeTransaction,
  useMutateTransferTransaction,
  useTags,
} from '../../../api-hooks';
import {QueryKeys} from '../../../api-hooks/query-keys';
import {Card} from '../../../components/Card';
import {ZenText} from '../../../components/ZenText';
import {useStore} from '../../../store/use-store';
import {EditTransactionScreenProps} from '../../../types';
import {exhaustiveCheck, showToast} from '../../../utils';
import {TransactionType} from '../transaction-type';
import {IncomeExpenseEditor, IncomeExpenseTransaction} from './IncomeExpenseEditor';
import {TransactionTypePicker} from './TransactionTypePicker';
import {TransferEditor, TransferTransaction} from './TransferEditor';

export const EditTransactionScreen: React.FC<EditTransactionScreenProps> = ({route, navigation}) => {
  const [transactionType, setTransactionType] = useState(route.params.transactionType);
  const {t} = useTranslation();
  const queryClient = useQueryClient();

  const {data: tagDict} = useTags();
  const tags = useMemo(() => (tagDict.values ? Array.from(tagDict.values()) : []), [tagDict]);
  const incomeTags = useMemo(() => tags.filter((tag) => tag.showIncome), [tags]);
  const expenseTags = useMemo(() => tags.filter((tag) => tag.showOutcome), [tags]);

  const {mutateAsync: mutateIncomeAsync} = useMutateIncomeTransaction();
  const {mutateAsync: mutateExpenseAsync} = useMutateExpenseTransaction();
  const {mutateAsync: mutateTransferAsync} = useMutateTransferTransaction();
  const addRecentExpenseAccount = useStore.use.addRecentExpenseAccount();
  const addRecentIncomeAccount = useStore.use.addRecentIncomeAccount();
  const addRecentTransferAccount = useStore.use.addRecentTransferAccount();
  const recentExpenseAccounts = useStore.use.recentExpenseAccounts();
  const recentIncomeAccounts = useStore.use.recentIncomeAccounts();
  const recentTransferAccounts = useStore.use.recentTransferAccounts();

  const onTransactionSave = useCallback(
    async (success: boolean) => {
      if (success) {
        await queryClient.invalidateQueries(QueryKeys.Transactions);
        showToast(t('EditTransactionScreen.TransactionSaved'));
        if (navigation.isFocused()) {
          navigation.pop();
        }
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

  const renderEditor = useCallback(() => {
    switch (transactionType) {
      case TransactionType.Income:
        return (
          <IncomeExpenseEditor
            tags={incomeTags}
            recentAccounts={recentIncomeAccounts}
            onSubmit={saveIncomeTransaction}
          />
        );
      case TransactionType.Expense:
        return (
          <IncomeExpenseEditor
            tags={expenseTags}
            recentAccounts={recentExpenseAccounts}
            onSubmit={saveExpenseTransaction}>
            <ZenText>
              <ZenText></ZenText>
            </ZenText>
          </IncomeExpenseEditor>
        );
      case TransactionType.Transfer:
        return <TransferEditor recentAccounts={recentTransferAccounts} onSubmit={saveTransferTransaction} />;
      default:
        exhaustiveCheck(transactionType);
    }
  }, [
    expenseTags,
    incomeTags,
    recentExpenseAccounts,
    recentIncomeAccounts,
    recentTransferAccounts,
    saveExpenseTransaction,
    saveIncomeTransaction,
    saveTransferTransaction,
    transactionType,
  ]);

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
