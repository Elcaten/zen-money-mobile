import * as React from 'react';
import {useCallback} from 'react';
import {useTranslation} from 'react-i18next';
import {useQueryClient} from 'react-query';
import {useDeleteTransaction, useTransactionModels} from '../../../api-hooks';
import {QueryKeys} from '../../../api-hooks/query-keys';
import {View} from '../../../components';
import {ZenText} from '../../../components/ZenText';
import {useHeaderButtons} from '../../../hooks/useHeaderButtons';
import {TransactionDetailsScreenProps} from '../../../types';
import {confirmDelete, showToast} from '../../../utils';

export const TransactionDetailsScreen: React.FC<TransactionDetailsScreenProps> = ({route, navigation}) => {
  const {data} = useTransactionModels();
  const transaction = data.find(({id}) => id === route.params.transactionId);

  const {t} = useTranslation();
  const queryClient = useQueryClient();

  const {deleteAsync, isDeleting} = useDeleteTransaction();

  const onDeletePress = useCallback(async () => {
    const confirmed = await confirmDelete(
      t('TransactionDetailsScreen.DeleteTransactionTitle'),
      t('TransactionDetailsScreen.DeleteTransactionMessage'),
    );

    if (confirmed && transaction != null) {
      await deleteAsync(transaction.id);
      await queryClient.invalidateQueries(QueryKeys.Transactions);
      showToast(t('TransactionDetailsScreen.DeleteSuccessMessage'));
      if (navigation.isFocused()) {
        navigation.pop();
      }
    }
  }, [deleteAsync, navigation, queryClient, t, transaction]);

  useHeaderButtons(navigation, {onDeletePress});

  return (
    <View disabled={isDeleting}>
      <ZenText>{JSON.stringify(transaction, null, 2)}</ZenText>
    </View>
  );
};
