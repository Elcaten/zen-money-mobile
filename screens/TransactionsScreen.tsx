import * as React from 'react';
import {FlatList, ListRenderItemInfo, StyleSheet} from 'react-native';
import {TransactionModel, useTransactionModels} from '../api-hooks';
import {Text, View} from '../components/Themed';
import {extractId} from '../utils';

const TransactionItem: React.FC<TransactionModel> = (props) => {
  return (
    <View style={styles.listItem}>
      <Text style={styles.itemType}>{props.tag}</Text>
      <Text style={styles.itemTitle}>{props.date}</Text>
      <Text>Income: {props.income}</Text>
      <Text>Outcome: {props.outcome}</Text>
    </View>
  );
};

export const TransactionsScreen: React.FC = () => {
  const {data, isLoading, invalidate} = useTransactionModels();

  const renderTransaction = React.useCallback(
    (info: ListRenderItemInfo<TransactionModel>) => <TransactionItem {...info.item} />,
    [],
  );

  return (
    <View style={styles.container}>
      <FlatList
        onRefresh={invalidate}
        refreshing={isLoading}
        data={data}
        keyExtractor={extractId}
        renderItem={renderTransaction}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemType: {
    flex: 0,
    minWidth: 72,
  },
  itemTitle: {
    flex: 1,
  },
});
