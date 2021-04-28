import * as React from 'react';
import {FlatList, ListRenderItemInfo} from 'react-native';
import styled from 'styled-components/native';
import {AccountModel, useAccountModels} from '../api-hooks/';
import {Text} from '../components';
import {ListItem} from '../components/ListItem';
import {extractId} from '../utils';
import {AccountIcon} from './components/AccountIcon';

const StyledListItem = styled(ListItem)``;

const StyledTitle = styled(Text)`
  flex: 1;
  font-size: 18px;
`;
const StyledBalance = styled(Text)`
  font-size: 18px;
`;

const AccountItem: React.FC<AccountModel> = (props) => {
  return (
    <StyledListItem>
      <AccountIcon type={props.type} size={32} />
      <StyledTitle>{props.title}</StyledTitle>
      <StyledBalance>
        {props.balance}
        {props.instrument}
      </StyledBalance>
    </StyledListItem>
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
