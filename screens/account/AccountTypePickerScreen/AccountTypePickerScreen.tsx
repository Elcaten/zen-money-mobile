import * as React from 'react';
import {FlatList, ListRenderItem} from 'react-native';
import {AccountType} from '../../../api/models';
import {OptionListItem} from '../../../components/ListItem';
import {useAccountTypes} from '../../../hooks/useAccountTypes';
import {AccountTypePickerScreenProps} from '../../../types';
import {extractId} from '../../../utils';

interface AccountTypeListItem {
  id: AccountType;
  title: string;
}

export const AccountTypePickerScreen: React.FC<AccountTypePickerScreenProps> = ({route, navigation}) => {
  const accountId = route.params.value;

  const options = useAccountTypes()
    .entriesArray()
    .map<AccountTypeListItem>(([id, title]) => ({id, title}));

  const renderItem: ListRenderItem<AccountTypeListItem> = ({item}) => {
    return (
      <OptionListItem
        title={item.title}
        onPress={() => {
          route.params.onSelect(item.id);
          navigation.goBack();
        }}
        checked={item.id === accountId}
      />
    );
  };

  return <FlatList data={options} renderItem={renderItem} keyExtractor={extractId} />;
};
