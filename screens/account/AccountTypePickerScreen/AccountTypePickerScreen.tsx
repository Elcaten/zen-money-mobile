import * as React from 'react';
import {FlatList, ListRenderItem} from 'react-native';
import {AccountType} from '../../../api/models';
import {CheckIcon} from '../../../components';
import {ListItem} from '../../../components/ListItem';
import {useAccountTypes} from '../../../hooks/useAccountTypes';
import {useNavigatorThemeColors} from '../../../themes';
import {AccountTypePickerScreenProps} from '../../../types';

interface AccountTypeListItem {
  id: AccountType;
  title: string;
}

export const AccountTypePickerScreen: React.FC<AccountTypePickerScreenProps> = ({route, navigation}) => {
  const options = useAccountTypes()
    .entriesArray()
    .map<AccountTypeListItem>(([id, title]) => ({id, title}));

  const {primary} = useNavigatorThemeColors();

  const renderItem: ListRenderItem<AccountTypeListItem> = ({item}) => {
    return (
      <ListItem
        onPress={() => {
          route.params.onSelect(item.id);
          navigation.goBack();
        }}>
        <ListItem.Content>
          <ListItem.Title>{item.title}</ListItem.Title>
        </ListItem.Content>
        {item.id === route.params.type ? <CheckIcon size={20} color={primary} /> : <></>}
      </ListItem>
    );
  };

  return <FlatList data={options} renderItem={renderItem} keyExtractor={getId} />;
};

function getId(item: AccountTypeListItem) {
  return item.id;
}
