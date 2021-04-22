import * as React from 'react';
import {FlatList, ListRenderItemInfo, StyleSheet} from 'react-native';
import styled from 'styled-components/native';
import {AccountModel, useAccountModels} from '../api-hooks/';
import {Text, View} from '../components/Themed';
import {extractId} from '../utils';
import {AccountIcon} from './components/AccountIcon';

const StyledIcon = styled(AccountIcon)`
  flex: 0;
  min-width: 48px;
`;
const StyledTitle = styled(Text)`
  flex: 1;
  font-size: 18px;
`;
const StyledBalance = styled(Text)`
  font-size: 18px;
`;

const AccountItem: React.FC<AccountModel> = (props) => {
  return (
    <View style={styles.listItem}>
      <StyledIcon type={props.type} size={32} />
      <StyledTitle>{props.title}</StyledTitle>
      <StyledBalance>
        {props.balance}
        {props.instrument}
      </StyledBalance>
    </View>
  );
};

export const AccountsScreen: React.FC = () => {
  const {data, isLoading, invalidate} = useAccountModels();

  const renderAccount = React.useCallback(
    (info: ListRenderItemInfo<AccountModel>) => <AccountItem {...info.item} />,
    [],
  );

  return (
    <View style={styles.container}>
      <FlatList
        onRefresh={invalidate}
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
    alignItems: 'center',
    padding: 10,
  },
  itemIcon: {
    flex: 0,
    minWidth: 48,
  },
  itemTitle: {
    flex: 1,
  },
});
