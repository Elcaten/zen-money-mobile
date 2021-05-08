import * as React from 'react';
import {FlatList, ListRenderItemInfo, StyleSheet} from 'react-native';
import {AccountModel, useAccountModels} from '../../api-hooks/';
import {Text} from '../../components';
import {ListItem} from '../../components/ListItem';
import {CINNABAR} from '../../constants/Colors';
import {AccountsScreenProps} from '../../types';
import {extractId} from '../../utils';
import {AccountIcon} from './AccountIcon';

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
      data={data}
      keyExtractor={extractId}
      renderItem={renderAccount}
    />
  );
};
