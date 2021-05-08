import * as React from 'react';
import {ScrollView} from 'react-native';
import {useAccountDictionary, useAccountModels} from '../../api-hooks';
import {Text} from '../../components';
import {AccountDetailsScreenProps} from '../../types';

export const AccountDetailsScreen: React.FC<AccountDetailsScreenProps> = ({navigation, route}) => {
  const accounts = useAccountModels();
  const account = accounts.data.find(({id}) => id === route.params.accountId);
  return (
    <ScrollView>
      <Text>{JSON.stringify(account, null, 2)}</Text>
    </ScrollView>
  );
};
