import * as React from 'react';
import {FlatList, ListRenderItemInfo, StyleSheet} from 'react-native';
import {AccountModel, useAccountModels} from '../api-hooks/';
import {Text} from '../components';
import {ListItem} from '../components/ListItem';
import {extractId} from '../utils';
import {AccountIcon} from './components/AccountIcon';

const styles = StyleSheet.create({
  title: {
    flex: 1,
    fontSize: 18,
  },
  balance: {
    fontSize: 18,
  },
});

const AccountItem: React.FC<AccountModel> = (props) => {
  return (
    <ListItem>
      <AccountIcon type={props.type} size={24} />
      <Text style={styles.title}>{props.title}</Text>
      <Text style={styles.balance}>
        {props.balance < 0 && '-'}
        {props.instrument}
        {Math.abs(props.balance)}
      </Text>
    </ListItem>
  );
};

export const AccountsScreen: React.FC = () => {
  const {data, isLoading, invalidate} = useAccountModels();

  const renderAccount = React.useCallback(
    (info: ListRenderItemInfo<AccountModel>) => <AccountItem {...info.item} />,
    [],
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
