import * as React from 'react';
import {useCallback} from 'react';
import {Picker} from 'react-native';
import {Account} from '../../api/models';
import {ListItem, ListItemProps, WalletIcon} from '../../components';

export type AccountPickerProps = ListItemProps & {
  accounts: Account[];
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
