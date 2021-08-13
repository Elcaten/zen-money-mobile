import React, {useState} from 'react';
import {UserAccount} from '../../../api/models';
import {WalletIcon} from '../../../components';
import {PickerListItem} from '../../../components/ListItem';
import {AccountPickerDialog} from './AccountPickerDialog';

export const AccountPicker: React.FC<{
  title: string;
  value: string;
  onSelect: (account: UserAccount) => void;
  recentAccounts: string[];
}> = ({title, value, onSelect, recentAccounts}) => {
  const [visible, setVisible] = useState(false);
  const toggleVisible = () => setVisible((v) => !v);

  return (
    <React.Fragment>
      <AccountPickerDialog
        value={value}
        recentAccounts={recentAccounts}
        onSelect={onSelect}
        visible={visible}
        onRequestClose={toggleVisible}
      />
      <PickerListItem bottomDivider leftIcon={() => <WalletIcon />} title={title} onPress={toggleVisible} />
    </React.Fragment>
  );
};
