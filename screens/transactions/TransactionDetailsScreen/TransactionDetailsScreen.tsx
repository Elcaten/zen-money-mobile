import * as React from 'react';
import {useCallback} from 'react';
import {useTranslation} from 'react-i18next';
import {ScrollView, StyleSheet} from 'react-native';
import {useQueryClient} from 'react-query';
import {useDeleteTransaction, useTransactionModels} from '../../../api-hooks';
import {QueryKeys} from '../../../api-hooks/query-keys';
import {Text} from '../../../components';
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
    await queryClient.invalidateQueries([QueryKeys.Transactions]);
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
    <ScrollView
      style={[styles.wrapper, isDeleting ? styles.disabledView : {}]}
      pointerEvents={isDeleting ? 'none' : 'auto'}>
      <Text>{JSON.stringify(transaction, null, 2)}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  wrapper: {},
  disabledView: {
    opacity: 0.5,
  },
});
