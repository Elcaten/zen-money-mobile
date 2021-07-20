import * as React from 'react';
import {StyleSheet} from 'react-native';
import {AccountModel} from '../../../api-hooks';
import {Text} from '../../../components';
import {ListItem} from '../../../components/ListItem';
import {CINNABAR} from '../../../constants/Colors';
import {AccountIcon} from '../AccountIcon';

const Balance: React.FC<{account: AccountModel}> = ({account}) => {
  return (
    <Text size="large" style={account.balance < 0 ? {color: CINNABAR} : {}}>
      {account.balance < 0 && '−'}
      {account.balanceFormatted}
    </Text>
  );
};

export const AccountListItem: React.FC<{account: AccountModel; onPress: () => void}> = ({account, onPress}) => {
  return (
    <ListItem onPress={onPress}>
      <AccountIcon type={account.type} size={24} />
      <Text size="large" style={styles.title}>
        {account.title}
      </Text>
      <Balance account={account} />
    </ListItem>
  );
};

const styles = StyleSheet.create({
  title: {
    flex: 1,
  },
});