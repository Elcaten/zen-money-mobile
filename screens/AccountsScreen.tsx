import * as React from 'react';
import {FlatList, ListRenderItemInfo, StyleSheet} from 'react-native';
import {useQuery, useQueryClient} from 'react-query';
import {Account, fetchAccounts} from '../api';
import {ACCOUNTS} from '../auth/constants';
import {Text, View} from '../components/Themed';

const AccountItem: React.FC<Account> = (props) => {
  return (
    <View style={styles.listItem}>
      <Text style={styles.itemType}>{props.type}</Text>
      <Text style={styles.itemTitle}>{props.title}</Text>
      <Text>{props.balance}</Text>
    </View>
  );
};

function extractId(entity: {id: string}, _index: number) {
  return entity.id;
}

export const AccountsScreen: React.FC = () => {
  const queryClient = useQueryClient();

  const {data: accounts, isLoading} = useQuery('accounts', fetchAccounts);

  const renderAccount = React.useCallback((info: ListRenderItemInfo<Account>) => <AccountItem {...info.item} />, []);

  return (
    <View style={styles.container}>
      <FlatList
        onRefresh={() => queryClient.invalidateQueries(ACCOUNTS)}
        refreshing={isLoading}
        data={accounts}
        keyExtractor={extractId}
        renderItem={renderAccount}
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
