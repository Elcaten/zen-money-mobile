import * as React from 'react';
import {ScrollView} from 'react-native';
import {useAccountModels} from '../../../api-hooks';
import {Text} from '../../../components';
import {AccountDetailsScreenProps} from '../../../types';

export const EditAccountScreen: React.FC<AccountDetailsScreenProps> = ({navigation, route}) => {
  const accounts = useAccountModels();
  const account = accounts.data.find(({id}) => id === route.params.accountId);

  return (
    <ScrollView>
      <Text>Edit {account?.title}</Text>
    </ScrollView>
  );
};
