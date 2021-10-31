import React, {useState} from 'react';
import {useAccountDictionary} from '../../../api-hooks';
import {UserAccount} from '../../../api/models';
import {WalletIcon} from '../../../components';
import {PickerListItem} from '../../../components/ListItem';
import {AccountPickerDialog} from './AccountPickerDialog';

export const AccountPicker: React.FC<{
  title: string;
  value: string;
  onSelect: (account: UserAccount) => void;
  recentAccounts: string[];
  RenderAs?: React.FC<{onPress: () => void; title: string | null | undefined}>;
}> = ({title, value, onSelect, recentAccounts, RenderAs}) => {
  const accountDict = useAccountDictionary();

  const [visible, setVisible] = useState(false);
  const toggleVisible = () => setVisible((v) => !v);

  return (
    <React.Fragment>
      <AccountPickerDialog
        visible={visible}
        value={value}
        recentAccounts={recentAccounts}
        onSelect={onSelect}
        onRequestClose={toggleVisible}
      />
      {RenderAs ? (
        <RenderAs onPress={toggleVisible} title={title} />
      ) : (
        <PickerListItem
          bottomDivider
          leftIcon={() => <WalletIcon />}
          title={title}
          value={accountDict?.get(value!)?.title ?? ''}
          onPress={toggleVisible}
        />
      )}
    </React.Fragment>
  );
};
