import {HeaderBackButton} from '@react-navigation/stack';
import * as React from 'react';
import {useCallback, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import {useMutateIncomeTransaction, useMutateTransferTransaction} from '../../../api-hooks/useMutateTransaction';
import {Text} from '../../../components';
import {EditTransactionScreenProps} from '../../../types';
import {exhaustiveCheck} from '../../../utils/exhaustive-check';
import {IncomeEditor, IncomeEditorHandles} from './IncomeEditor';
import {TransactionType} from '../transaction-type';
import {TransactionTypePicker} from './TransactionTypePicker';
import {TransferEditor, TransferEditorHandles} from './TransferEditor';

export const EditTransactionScreen: React.FC<EditTransactionScreenProps> = ({route, navigation}) => {
  const incomeEditorRef = useRef<IncomeEditorHandles>(null);
  const transferEditorRef = useRef<TransferEditorHandles>(null);

  const [transactionType, setTransactionType] = useState(route.params.transactionType);

  const onSavePress = useCallback(() => {
    switch (transactionType) {
      case TransactionType.Income:
        return incomeEditorRef.current?.submit();
      case TransactionType.Transfer:
        return transferEditorRef.current?.submit();
      case TransactionType.Expense:
        return () => {};
      default:
        exhaustiveCheck(transactionType);
    }
  }, [transactionType]);

  const {t} = useTranslation();
  const {mutateAsync: mutateIncomeAsync} = useMutateIncomeTransaction();
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
          <Item title={t('Screen.AddTransaction.Save')} onPress={onSavePress} />
        </HeaderButtons>
      ),
    });
  }, [mutateIncomeAsync, navigation, onSavePress, t, transactionType]);

  const renderEditor = useCallback(() => {
    switch (transactionType) {
      case TransactionType.Income:
        return <IncomeEditor onSubmit={mutateIncomeAsync} ref={incomeEditorRef} />;
      case TransactionType.Transfer:
        return <TransferEditor onSubmit={mutateTransferAsync} ref={transferEditorRef} />;
      case TransactionType.Expense:
        return <Text>Not Implemented</Text>;
      default:
        exhaustiveCheck(transactionType);
    }
  }, [mutateIncomeAsync, mutateTransferAsync, transactionType]);

  return renderEditor();
};
