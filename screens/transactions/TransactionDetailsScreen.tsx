import * as React from 'react';
import {ScrollView} from 'react-native';
import {useTransactionModels} from '../../api-hooks';
import {Text} from '../../components';
import {TransactionDetailsScreenProps} from '../../types';

export const TransactionDetailsScreen: React.FC<TransactionDetailsScreenProps> = ({route, navigation}) => {
  const {data} = useTransactionModels();
  const transaction = data.find(({id}) => id === route.params.transactionId);

  return (
    <ScrollView>
      <Text>{JSON.stringify(transaction, null, 2)}</Text>
    </ScrollView>
  );
};
