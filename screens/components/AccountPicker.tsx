import * as React from 'react';
import {useCallback} from 'react';
import {Picker} from 'react-native';
import {Account} from '../../api/models';
import {ListItem, WalletIcon} from '../../components';

export interface AccountPickerProps {
  accounts: Account[];
  selectedAccount: Account | null;
  onSelect: (account: Account) => void;
}

export const AccountPicker: React.FC<AccountPickerProps> = ({accounts, selectedAccount, onSelect: _onSelect}) => {
  const onSelect = useCallback(
    (id: string) => {
      _onSelect(accounts.find((t) => t.id === id)!);
    },
    [_onSelect, accounts],
  );

  return (
    <ListItem>
      <WalletIcon size={24} />
      <Picker onValueChange={onSelect} selectedValue={selectedAccount?.id} style={{flex: 1}}>
        {accounts.map((acc) => (
          <Picker.Item key={acc.id} value={acc.id} label={acc.title} />
        ))}
      </Picker>
    </ListItem>
  );
};
