import * as React from 'react';
import {FlatList, ListRenderItem} from 'react-native';
import {useAccounts} from '../../../api-hooks';
import {UserAccount} from '../../../api/models';
import {CheckIcon} from '../../../components';
import {ListItem} from '../../../components/ListItem';
import {useNavigatorThemeColors} from '../../../themes';
import {AccountPickerScreenProps} from '../../../types';
import {extractId} from '../../../utils';

export const AccountPickerScreen: React.FC<AccountPickerScreenProps> = ({route, navigation}) => {
  const accountId = route.params.value;

  const {data: options} = useAccounts();

  const {primary} = useNavigatorThemeColors();

  const renderItem: ListRenderItem<UserAccount> = ({item}) => {
    return (
      <ListItem
        onPress={() => {
          route.params.onSelect(item.id);
          navigation.goBack();
        }}>
        <ListItem.Content>
          <ListItem.Title>{item.title}</ListItem.Title>
        </ListItem.Content>
        {item.id === accountId ? <CheckIcon size={20} color={primary} /> : <></>}
      </ListItem>
    );
  };

  return <FlatList data={options ?? []} renderItem={renderItem} keyExtractor={extractId} />;
};
