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
import {IncomeExpenseEditor, IncomeExpenseEditorHandles} from './IncomeExpenseEditor';
import {TransactionType} from '../transaction-type';
import {TransactionTypePicker} from './TransactionTypePicker';
import {TransferEditor, TransferEditorHandles} from './TransferEditor';

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

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <HeaderButtons>
          <HeaderBackButton onPress={() => navigation.pop()} />
          <TransactionTypePicker onSelect={setTransactionType} selectedType={transactionType} style={{width: 130}} />
        </HeaderButtons>
      ),
      headerRight: () => (
        <HeaderButtons>
          <Item title={t('EditTransactionScreen.Save')} onPress={onSavePress} />
        </HeaderButtons>
      ),
    });
  }, [mutateIncomeAsync, navigation, onSavePress, t, transactionType]);

  const renderEditor = useCallback(() => {
    switch (transactionType) {
      case TransactionType.Income:
        return <IncomeExpenseEditor onSubmit={mutateIncomeAsync} ref={incomeEditorRef} />;
      case TransactionType.Expense:
        return <IncomeExpenseEditor onSubmit={mutateExpenseAsync} ref={expenseEditorRef} />;
      case TransactionType.Transfer:
        return <TransferEditor onSubmit={mutateTransferAsync} ref={transferEditorRef} />;
      default:
        exhaustiveCheck(transactionType);
    }
  }, [mutateExpenseAsync, mutateIncomeAsync, mutateTransferAsync, transactionType]);

  return renderEditor();
};
