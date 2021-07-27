import * as React from 'react';
import {useCallback, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {ScrollView, StyleSheet} from 'react-native';
import {useQueryClient} from 'react-query';
import {QueryKeys} from '../../../api-hooks/query-keys';
import {Card} from '../../../components/Card';
import {EditTransactionScreenProps} from '../../../types';
import {exhaustiveCheck, showToast} from '../../../utils';
import {TransactionType} from '../transaction-type';
import {IncomeExpenseEditor} from './IncomeExpenseEditor';
import {TransactionTypePicker} from './TransactionTypePicker';
import {TransferEditor} from './TransferEditor';

export const EditTransactionScreen: React.FC<EditTransactionScreenProps> = ({route, navigation}) => {
  const [transactionType, setTransactionType] = useState(route.params.transactionType);
  const {t} = useTranslation();
  const queryClient = useQueryClient();

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

  const renderEditor = useCallback(() => {
    switch (transactionType) {
      case TransactionType.Income:
        return <IncomeExpenseEditor onSubmit={onTransactionSave} type="income" />;
      case TransactionType.Expense:
        return <IncomeExpenseEditor onSubmit={onTransactionSave} type="expense" />;
      case TransactionType.Transfer:
        return <TransferEditor onSubmit={onTransactionSave} />;
      default:
        exhaustiveCheck(transactionType);
    }
  }, [onTransactionSave, transactionType]);

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
