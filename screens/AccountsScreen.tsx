import * as React from 'react';
import {useCallback, useMemo} from 'react';
import {FlatList, ListRenderItemInfo, StyleSheet} from 'react-native';
import {useQueryClient} from 'react-query';
import {AccountModel, useAccounts} from '../api-hooks/';
import {useInstruments} from '../api-hooks/useInstruments';
import {ACCOUNTS} from '../auth/constants';
import {Text, View} from '../components/Themed';
import {extractId} from '../utils';

const AccountItem: React.FC<AccountModel> = (props) => {
  return (
    <View style={styles.listItem}>
      <Text style={styles.itemType}>{props.type}</Text>
      <Text style={styles.itemTitle}>{props.title}</Text>
      <Text>{props.balance}</Text>
      <Text>{props.instrument}</Text>
    </View>
  );
};

const useAccountModels = () => {
  const accounts = useAccounts();
  const instruments = useInstruments();
  const accountModels = useMemo<AccountModel[]>(
    () =>
      accounts.data?.map(({id, title, type, balance, instrument}) => ({
        id,
        title,
        type,
        balance,
        instrument: instruments.data?.get(instrument)?.symbol ?? '',
      })) ?? [],
    [accounts.data, instruments],
  );
  return {data: accountModels, isLoading: accounts.isLoading || instruments.isLoading};
};

export const AccountsScreen: React.FC = () => {
  const {data, isLoading} = useAccountModels();

  const renderAccount = React.useCallback(
    (info: ListRenderItemInfo<AccountModel>) => <AccountItem {...info.item} />,
    [],
  );

  const queryClient = useQueryClient();
  const refresh = useCallback(() => () => queryClient.invalidateQueries(ACCOUNTS), [queryClient]);

  return (
    <View style={styles.container}>
      <FlatList
        onRefresh={refresh}
        refreshing={isLoading}
        data={data}
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
