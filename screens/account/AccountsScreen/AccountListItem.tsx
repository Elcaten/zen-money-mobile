import * as React from 'react';
import {StyleSheet} from 'react-native';
import {AccountModel} from '../../../api-hooks';
import {ZenText} from '../../../components/ZenText';
import {ListItem} from '../../../components/ListItem';
import {RED_500} from '../../../constants/Colors';
import {AccountIcon} from '../AccountIcon';

const Balance: React.FC<{account: AccountModel}> = ({account}) => {
  return (
    <ZenText size="large" style={account.balance < 0 ? {color: RED_500} : {}}>
      {account.balance < 0 && '−'}
      {account.balanceFormatted}
    </ZenText>
  );
};

export const AccountListItem: React.FC<{account: AccountModel; onPress: () => void}> = ({account, onPress}) => {
  return (
    <ListItem onPress={onPress}>
      <AccountIcon type={account.type} size={24} />
      <ZenText size="large" style={styles.title}>
        {account.title}
      </ZenText>
      <Balance account={account} />
    </ListItem>
  );
};

const styles = StyleSheet.create({
  title: {
    flex: 1,
  },
});
