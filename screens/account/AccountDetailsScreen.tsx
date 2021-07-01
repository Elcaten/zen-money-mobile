import {MaterialCommunityIcons, MaterialIcons} from '@expo/vector-icons';
import * as React from 'react';
import {useCallback, useLayoutEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {Alert, ScrollView, StyleSheet} from 'react-native';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import {useQueryClient} from 'react-query';
import {useAccountModels} from '../../api-hooks';
import {QueryKeys} from '../../api-hooks/query-keys';
import {useDeleteAccount} from '../../api-hooks/useMutateAccount';
import {Text} from '../../components';
import {AccountDetailsScreenProps} from '../../types';
import {showToast} from '../../utils';

export const AccountDetailsScreen: React.FC<AccountDetailsScreenProps> = ({navigation, route}) => {
  const accounts = useAccountModels();
  const account = accounts.data.find(({id}) => id === route.params.accountId);

  const {t} = useTranslation();
  const queryClient = useQueryClient();

  const {mutateAsync: deleteAsync, isLoading: isDeleting} = useDeleteAccount();

  const onDeletePress = useCallback(() => {
    Alert.alert(t('Screen.AccountDetails.DeleteAccountTitle'), t('Screen.AccountDetails.DeleteAccountMessage'), [
      {
        text: t('Screen.AccountDetails.CancelButtonText'),
        onPress: () => {},
        style: 'cancel',
      },
      {
        text: t('Screen.AccountDetails.DeleteButtonText'),
        onPress: async () => {
          if (account == null) {
            return;
          }
          await deleteAsync(account.id);
          await queryClient.invalidateQueries([QueryKeys.Accounts, QueryKeys.Transactions]);
          showToast(t('Screen.AccountDetails.DeleteSuccessMessage'));
          navigation.pop();
        },
      },
    ]);
  }, [account, deleteAsync, navigation, queryClient, t]);

  const onEditPress = useCallback(() => navigation.navigate('EditAccountScreen', {accountId: route.params.accountId}), [
    navigation,
    route.params.accountId,
  ]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButtons>
          <Item
            title={t('Screen.EditAccount.AccountSettings')}
            IconComponent={MaterialCommunityIcons}
            iconName="trash-can-outline"
            iconSize={24}
            onPress={onDeletePress}
          />
          <Item
            title={t('Screen.EditAccount.AccountSettings')}
            IconComponent={MaterialIcons}
            iconName="edit"
            iconSize={24}
            onPress={onEditPress}
          />
        </HeaderButtons>
      ),
    });
  }, [navigation, onDeletePress, onEditPress, t]);

  return (
    <ScrollView style={isDeleting ? styles.disabledView : []} pointerEvents={isDeleting ? 'none' : 'auto'}>
      <Text>{JSON.stringify(account, null, 2)}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  disabledView: {
    opacity: 0.5,
  },
});
