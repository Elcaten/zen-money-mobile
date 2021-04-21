import * as React from 'react';
import {Button, FlatList, ListRenderItemInfo, StyleSheet} from 'react-native';
import {useQuery, useQueryClient} from 'react-query';
import {Account, fetchAccounts} from '../api';
import {logout} from '../auth';
import {ACCOUNTS} from '../auth/constants';
import {Text, View} from '../components/Themed';

const AccountItem: React.FC<Account> = (props) => {
  return (
    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
      <Text>{props.title}</Text>
      <Text>{props.archive ? 'T' : 'f'}</Text>
      <Text>{props.balance}</Text>
    </View>
  );
};

function extractId(entity: {id: string}, _index: number) {
  return entity.id;
}

export default function TabTwoScreen() {
  const queryClient = useQueryClient();

  const {data: accounts, isLoading} = useQuery('accounts', fetchAccounts);

  const renderAccount = React.useCallback((info: ListRenderItemInfo<Account>) => <AccountItem {...info.item} />, []);

  return (
    <View style={styles.container}>
      <Button title="Log Out" onPress={logout} />
      <FlatList
        onRefresh={() => queryClient.invalidateQueries(ACCOUNTS)}
        refreshing={isLoading}
        data={accounts}
        keyExtractor={extractId}
        renderItem={renderAccount}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
