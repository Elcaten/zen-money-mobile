import * as React from 'react';
import {Picker} from 'react-native';
import {UserAccount} from '../../../api/models';
import {WalletIcon} from '../../../components';
import {ListItem, ListItemProps} from '../../../components/ListItem';

export type AccountPickerProps = ListItemProps & {
  accounts: UserAccount[];
  selectedAccount?: string | null;
  onSelect: (id: string) => void;
};

export const AccountPicker: React.FC<AccountPickerProps> = ({accounts, selectedAccount, onSelect, ...rest}) => {
  // const onSelect = useCallback(
  //   (id: string) => {
  //     _onSelect(accounts.find((t) => t.id === id)!);
  //   },
  //   [_onSelect, accounts],
  // );

  return (
    <ListItem {...rest}>
      <WalletIcon size={24} />
      <Picker onValueChange={onSelect} selectedValue={selectedAccount} style={{flex: 1}}>
        {accounts.map((acc) => (
          <Picker.Item key={acc.id} value={acc.id} label={acc.title} />
        ))}
      </Picker>
    </ListItem>
  );
};
