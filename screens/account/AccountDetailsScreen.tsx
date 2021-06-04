import {MaterialIcons} from '@expo/vector-icons';
import * as React from 'react';
import {useCallback, useLayoutEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {ScrollView} from 'react-native';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import {useAccountModels} from '../../api-hooks';
import {Text} from '../../components';
import {AccountDetailsScreenProps} from '../../types';

export const AccountDetailsScreen: React.FC<AccountDetailsScreenProps> = ({navigation, route}) => {
  const accounts = useAccountModels();
  const account = accounts.data.find(({id}) => id === route.params.accountId);

  const {t} = useTranslation();

  const onSettingsPress = useCallback(
    () => navigation.navigate('EditAccountScreen', {accountId: route.params.accountId}),
    [navigation, route.params.accountId],
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButtons>
          <Item
            title={t('Screen.EditAccount.AccountSettings')}
            IconComponent={MaterialIcons}
            iconName="settings"
            iconSize={24}
            onPress={onSettingsPress}
          />
        </HeaderButtons>
      ),
    });
  }, [navigation, onSettingsPress, t]);

  return (
    <ScrollView>
      <Text>{JSON.stringify(account, null, 2)}</Text>
    </ScrollView>
  );
};
