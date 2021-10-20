import {useNavigation} from '@react-navigation/core';
import React, {useCallback} from 'react';
import {useAccountDictionary} from '../../../api-hooks';
import {UserAccount} from '../../../api/models';
import {WalletIcon} from '../../../components';
import {PickerListItem} from '../../../components/ListItem';
import {AccountPickerScreenNavigationProp} from '../../../types';

export const AccountPicker: React.FC<{
  title: string;
  value: string;
  onSelect: (account: UserAccount) => void;
  recentAccounts: string[];
  RenderAs?: React.FC<{onPress: () => void; title: string | null | undefined}>;
}> = ({title, value, onSelect, recentAccounts, RenderAs}) => {
  const navigation = useNavigation<AccountPickerScreenNavigationProp>();
  const accountDict = useAccountDictionary();
  const onPress = useCallback(
    () => navigation.navigate('AccountPickerScreen', {value, onSelect, recentAccounts}),
    [navigation, onSelect, recentAccounts, value],
  );

  return RenderAs ? (
    <RenderAs onPress={onPress} title={title} />
  ) : (
    <PickerListItem
      bottomDivider
      leftIcon={() => <WalletIcon />}
      title={title}
      value={accountDict?.get(value!)?.title ?? ''}
      onPress={onPress}
    />
  );
};
