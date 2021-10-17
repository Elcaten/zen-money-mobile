import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {useAccountDictionary} from '../../../api-hooks';
import {UserAccount} from '../../../api/models';
import {WalletIcon} from '../../../components';
import {PickerListItem} from '../../../components/ListItem';
import {EditTransactionScreenNavigationProp} from '../../../types';

export const AccountPicker: React.FC<{
  title: string;
  value: string;
  onSelect: (account: UserAccount) => void;
  recentAccounts: string[];
}> = ({title, value, onSelect, recentAccounts}) => {
  const navigation = useNavigation<EditTransactionScreenNavigationProp>();
  const accountsDict = useAccountDictionary();

  return (
    <PickerListItem
      bottomDivider
      leftIcon={() => <WalletIcon />}
      title={title}
      value={accountsDict?.get(value!)?.title ?? ''}
      onPress={() => navigation.navigate('AccountPickerScreen', {value, onSelect, recentAccounts})}
    />
  );
};
