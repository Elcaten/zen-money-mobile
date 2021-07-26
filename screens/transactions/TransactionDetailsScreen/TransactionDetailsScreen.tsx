import * as React from 'react';
import {useCallback} from 'react';
import {useTranslation} from 'react-i18next';
import {useQueryClient} from 'react-query';
import {useDeleteTransaction, useTransactionModels} from '../../../api-hooks';
import {QueryKeys} from '../../../api-hooks/query-keys';
import {View} from '../../../components';
import {ZenText} from '../../../components/ZenText';
import {useHeaderButtons} from '../../../hooks/useHeaderButtons';
import {useDeletePress} from '../../../hooks/useOnDeletePress';
import {TransactionDetailsScreenProps} from '../../../types';
import {showToast} from '../../../utils';

export const TransactionDetailsScreen: React.FC<TransactionDetailsScreenProps> = ({route, navigation}) => {
  const {data} = useTransactionModels();
  const transaction = data.find(({id}) => id === route.params.transactionId);

  const {t} = useTranslation();
  const queryClient = useQueryClient();

  const {deleteAsync, isDeleting} = useDeleteTransaction();

  const onDeleteConfirm = useCallback(async () => {
    if (transaction == null) {
      return;
    }
    await deleteAsync(transaction.id);
    await queryClient.invalidateQueries(QueryKeys.Transactions);
    showToast(t('TransactionDetailsScreen.DeleteSuccessMessage'));
    navigation.pop();
  }, [deleteAsync, navigation, queryClient, t, transaction]);

  const onDeletePress = useDeletePress(
    t('TransactionDetailsScreen.DeleteTransactionTitle'),
    t('TransactionDetailsScreen.DeleteTransactionMessage'),
    onDeleteConfirm,
  );

  useHeaderButtons(navigation, {onDeletePress});

  return (
    <View disabled={isDeleting}>
      <ZenText>{JSON.stringify(transaction, null, 2)}</ZenText>
    </View>
  );
};
