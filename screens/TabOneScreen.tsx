import * as React from 'react';
import {useCallback} from 'react';
import {Button, ListRenderItemInfo, StyleSheet} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {useQuery} from 'react-query';
import {fetchAccounts, Account} from '../api/fetchAccounts';
import {login, logout} from '../auth';
import {Text, View} from '../components/Themed';

const AccountItem: React.FC<Account> = (props) => {
  return (
    <View style={styles.accountItem}>
      <Text>{props.title}</Text>
    </View>
  );
};

function getAccountKey(account: Account, _index: number) {
  return account.id;
}

export default function TabOneScreen() {
  const query = useQuery('accounts', fetchAccounts);
  const renderItem = useCallback((info: ListRenderItemInfo<Account>) => <AccountItem {...info.item} />, []);

  return (
    <View style={styles.container}>
      <Button title="Log In" onPress={login} />
      <Button title="Log Out" onPress={logout} />
      <FlatList data={query.data} keyExtractor={getAccountKey} renderItem={renderItem} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  accountItem: {
    margin: 10,
  },
});
