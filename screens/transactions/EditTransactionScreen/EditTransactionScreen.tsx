import {HeaderBackButton} from '@react-navigation/stack';
import * as React from 'react';
import {useCallback, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import {
  useMutateExpenseTransaction,
  useMutateIncomeTransaction,
  useMutateTransferTransaction,
} from '../../../api-hooks/useMutateTransaction';
import {EditTransactionScreenProps} from '../../../types';
import {exhaustiveCheck} from '../../../utils/exhaustive-check';
import {IncomeExpenseEditor, IncomeExpenseEditorHandles, IncomeExpenseTransaction} from './IncomeExpenseEditor';
import {TransactionType} from '../transaction-type';
import {TransactionTypePicker} from './TransactionTypePicker';
import {TransferEditor, TransferEditorHandles, TransferTransaction} from './TransferEditor';
import {useQueryClient} from 'react-query';
import {QueryKeys} from '../../../api-hooks/query-keys';
import {showToast} from '../../../utils';
import {useHeaderButtons} from '../../../hooks/useHeaderButtons';

export const EditTransactionScreen: React.FC<EditTransactionScreenProps> = ({route, navigation}) => {
  const incomeEditorRef = useRef<IncomeExpenseEditorHandles>(null);
  const expenseEditorRef = useRef<IncomeExpenseEditorHandles>(null);
  const transferEditorRef = useRef<TransferEditorHandles>(null);

  const [transactionType, setTransactionType] = useState(route.params.transactionType);

  const onSavePress = useCallback(() => {
    switch (transactionType) {
      case TransactionType.Income:
        return incomeEditorRef.current?.submit();
      case TransactionType.Expense:
        return expenseEditorRef.current?.submit();
      case TransactionType.Transfer:
        return transferEditorRef.current?.submit();
      default:
        exhaustiveCheck(transactionType);
    }
  }, [transactionType]);

  const {t} = useTranslation();

  const {mutateAsync: mutateIncomeAsync} = useMutateIncomeTransaction();
  const {mutateAsync: mutateExpenseAsync} = useMutateExpenseTransaction();
  const {mutateAsync: mutateTransferAsync} = useMutateTransferTransaction();

  const queryClient = useQueryClient();
  const handleSumbitResult = useCallback(
    async (success: boolean) => {
      if (success) {
        await queryClient.invalidateQueries(QueryKeys.Transactions);
        showToast(t('EditTransactionScreen.TransactionSaved'));
        navigation.pop();
      } else {
        showToast('Error');
      }
    },
    [navigation, queryClient, t],
  );
  const onIncomeSubmit = useCallback(
    async (tr: IncomeExpenseTransaction) => {
      const {success} = await mutateIncomeAsync(tr);
      handleSumbitResult(success);
    },
    [handleSumbitResult, mutateIncomeAsync],
  );
  const onExpenseSubmit = useCallback(
    async (tr: IncomeExpenseTransaction) => {
      const {success} = await mutateExpenseAsync(tr);
      handleSumbitResult(success);
    },
    [handleSumbitResult, mutateExpenseAsync],
  );
  const onTransferSubmit = useCallback(
    async (tr: TransferTransaction) => {
      const {success} = await mutateTransferAsync(tr);
      handleSumbitResult(success);
    },
    [handleSumbitResult, mutateTransferAsync],
  );

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <TransactionTypePicker onSelect={setTransactionType} selectedType={transactionType} style={{width: 130}} />
      ),
    });
  }, [navigation, t, transactionType]);

  useHeaderButtons(navigation, {onSavePress});

  const renderEditor = useCallback(() => {
    switch (transactionType) {
      case TransactionType.Income:
        return <IncomeExpenseEditor onSubmit={onIncomeSubmit} ref={incomeEditorRef} />;
      case TransactionType.Expense:
        return <IncomeExpenseEditor onSubmit={onExpenseSubmit} ref={expenseEditorRef} />;
      case TransactionType.Transfer:
        return <TransferEditor onSubmit={onTransferSubmit} ref={transferEditorRef} />;
      default:
        exhaustiveCheck(transactionType);
    }
  }, [onExpenseSubmit, onIncomeSubmit, onTransferSubmit, transactionType]);

  return renderEditor();
};
