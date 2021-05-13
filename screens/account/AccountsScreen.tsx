import * as React from 'react';
import {useMemo, useState} from 'react';
import {Button, FlatList, ListRenderItemInfo, StyleSheet} from 'react-native';
import {AccountModel, useAccountModels} from '../../api-hooks/';
import {Text, View} from '../../components';
import {ListItem} from '../../components/ListItem';
import {CINNABAR} from '../../constants/Colors';
import {AccountsScreenProps} from '../../types';
import {extractId} from '../../utils';
import {AccountIcon} from './AccountIcon';
import Collapsible from 'react-native-collapsible';

const styles = StyleSheet.create({
  title: {
    flex: 1,
    fontSize: 18,
  },
  balance: {
    fontSize: 18,
  },
});

const Balance: React.FC<{account: AccountModel}> = ({account}) => {
  return (
    <Text style={[styles.balance, account.balance < 0 ? {color: CINNABAR} : {}]}>
      {account.balance < 0 && '−'}
      {account.balanceFormatted}
    </Text>
  );
};

const AccountItem: React.FC<{account: AccountModel; onPress: () => void}> = ({account, onPress}) => {
  return (
    <ListItem onPress={onPress}>
      <AccountIcon type={account.type} size={24} />
      <Text style={styles.title}>{account.title}</Text>
      <Balance account={account} />
    </ListItem>
  );
};

export const AccountsScreen: React.FC<AccountsScreenProps> = ({navigation}) => {
  const {data, isLoading, invalidate} = useAccountModels();

  const [showArchived, setShowArchived] = useState(false);
  const archivedAccounts = useMemo(() => data.filter((a) => a.archive), [data]);
  const nonArchivedAccounts = useMemo(() => data.filter((a) => !a.archive), [data]);

  const renderAccount = React.useCallback(
    (info: ListRenderItemInfo<AccountModel>) => (
      <AccountItem
        account={info.item}
        onPress={() => navigation.navigate('AccountDetailsScreen', {accountId: info.item.id})}
      />
    ),
    [navigation],
  );

  return (
    <FlatList
      onRefresh={invalidate}
      refreshing={isLoading}
      data={nonArchivedAccounts}
      keyExtractor={extractId}
      renderItem={renderAccount}
      ListFooterComponent={
        <View>
          <View style={{alignItems: 'flex-end'}}>
            <Text onPress={() => setShowArchived((v) => !v)}>Show all</Text>
          </View>
          <Collapsible collapsed={!showArchived}>
            <FlatList data={archivedAccounts} keyExtractor={extractId} renderItem={renderAccount} />
          </Collapsible>
        </View>
      }
    />
  );
};
