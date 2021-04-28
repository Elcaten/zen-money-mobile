import * as React from 'react';
import {FlatList, ListRenderItemInfo} from 'react-native';
import styled from 'styled-components/native';
import {AccountModel, useAccountModels} from '../api-hooks/';
import {Text} from '../components';
import {ListItem} from '../components/ListItem';
import {extractId} from '../utils';
import {AccountIcon} from './components/AccountIcon';

const StyledTitle = styled(Text)`
  flex: 1;
  font-size: 18px;
`;
const StyledBalance = styled(Text)`
  font-size: 18px;
`;

const AccountItem: React.FC<AccountModel> = (props) => {
  return (
    <ListItem>
      <AccountIcon type={props.type} size={24} />
      <StyledTitle>{props.title}</StyledTitle>
      <StyledBalance>
        {props.balance < 0 && '-'}
        {props.instrument}
        {Math.abs(props.balance)}
      </StyledBalance>
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
