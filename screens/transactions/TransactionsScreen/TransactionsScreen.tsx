import * as React from 'react';
import {useCallback} from 'react';
import {RefreshControl, StyleSheet, View} from 'react-native';
import {useTransactionModels} from '../../../api-hooks';
import {TransactionsScreenProps} from '../../../types';
import {TransactionList} from '../../components/TransactionList';
import {AddTransactionButton} from './AddTransactionButton';

export const TransactionsScreen: React.FC<TransactionsScreenProps> = ({navigation}) => {
  const {data, isLoading, invalidate} = useTransactionModels();

  const navigateToDetails = useCallback(
    (transactionId: string) => {
      navigation.navigate('TransactionDetailsScreen', {transactionId});
    },
    [navigation],
  );

  return (
    <View style={styles.container}>
      <TransactionList
        data={data}
        scrollViewProps={{
          refreshControl: <RefreshControl refreshing={isLoading} onRefresh={invalidate} />,
        }}
        onItemPress={navigateToDetails}
      />
      <AddTransactionButton />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
