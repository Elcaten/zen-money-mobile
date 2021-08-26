import React, {useState} from 'react';
import {UserAccount} from '../../../api/models';
import {WalletIcon} from '../../../components';
import {PickerListItem} from '../../../components/ListItem';
import {AccountPickerDialog} from './AccountPickerDialog';

export const AccountPicker: React.FC<{
  title: string;
  value: string;
  onSelect: (account: UserAccount) => void;
  RenderAs?: React.FC<{onPress: () => void; title: string}>;
  recentAccounts?: string[];
}> = ({title, value, onSelect, recentAccounts, RenderAs}) => {
  const [visible, setVisible] = useState(false);
  const toggleVisible = () => setVisible((v) => !v);

  return (
    <React.Fragment>
      <AccountPickerDialog
        value={value}
        recentAccounts={recentAccounts ?? []}
        onSelect={onSelect}
        visible={visible}
        onRequestClose={toggleVisible}
      />
      {RenderAs ? (
        <RenderAs onPress={toggleVisible} title={title} />
      ) : (
        <PickerListItem bottomDivider leftIcon={() => <WalletIcon />} title={title} onPress={toggleVisible} />
      )}
    </React.Fragment>
  );
};
