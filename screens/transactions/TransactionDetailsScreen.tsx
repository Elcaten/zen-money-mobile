import {MaterialIcons} from '@expo/vector-icons';
import * as React from 'react';
import {ScrollView} from 'react-native';
import {Item} from 'react-navigation-header-buttons';
import {useDeleteTransaction, useTransactionModels} from '../../api-hooks';
import {Text} from '../../components';
import {useHeaderButtons} from '../../hooks/useHeaderButtons';
import {useDeletePress} from '../../hooks/useOnDeletePress';
import {TransactionDetailsScreenProps} from '../../types';
import {useTranslation} from 'react-i18next';
import {useQueryClient} from 'react-query';
import {QueryKeys} from '../../api-hooks/query-keys';
import {showToast} from '../../utils';
import {useCallback} from 'react';

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

import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  wrapper: {},
  disabledView: {
    opacity: 0.5,
  },
});
