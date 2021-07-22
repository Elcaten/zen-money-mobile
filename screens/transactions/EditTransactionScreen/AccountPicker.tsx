import * as React from 'react';
import {Picker, StyleSheet} from 'react-native';
import {UserAccount} from '../../../api/models';
import {ListItem, ListItemProps} from '../../../components/ListItem';

export type AccountPickerProps = ListItemProps & {
  accounts: UserAccount[];
  selectedAccount?: string | null;
  onSelect: (id: string) => void;
};

export const AccountPicker: React.FC<AccountPickerProps> = ({accounts, selectedAccount, onSelect, ...rest}) => {
  return (
    <ListItem {...rest} bottomDivider style={styles.wrapper}>
      <Picker onValueChange={onSelect} selectedValue={selectedAccount} style={styles.picker}>
        {accounts.map((acc) => (
          <Picker.Item key={acc.id} value={acc.id} label={acc.title} />
        ))}
      </Picker>
    </ListItem>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  picker: {
    flex: 1,
  },
});
