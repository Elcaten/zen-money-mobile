import {MaterialCommunityIcons, MaterialIcons} from '@expo/vector-icons';
import * as React from 'react';
import {useCallback, useEffect, useLayoutEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Alert, Animated, RefreshControl, StyleSheet} from 'react-native';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import {useQueryClient} from 'react-query';
import {TransactionModel, useAccountModels, useTransactionModels} from '../../api-hooks';
import {QueryKeys} from '../../api-hooks/query-keys';
import {useDeleteAccount} from '../../api-hooks/useMutateAccount';
import {Text, View} from '../../components';
import {Card} from '../../components/Card';
import {useToolbarOpacity} from '../../hooks';
import {useNavigatorThemeColors} from '../../themes';
import {AccountDetailsScreenProps} from '../../types';
import {showToast} from '../../utils';
import {TransactionList} from '../components/TransactionList';
import {AccountIcon} from './AccountIcon';

const HEADER_HEIGHT = 220;

export const AccountDetailsScreen: React.FC<AccountDetailsScreenProps> = ({navigation, route}) => {
  const accountId = route.params.accountId;
  const accounts = useAccountModels();
  const account = accounts.data.find(({id}) => id === accountId);

  const {t} = useTranslation();
  const queryClient = useQueryClient();

  const {mutateAsync: deleteAsync, isLoading: isDeleting} = useDeleteAccount();

  const onDeletePress = useCallback(() => {
    Alert.alert(t('AccountDetailsScreen.DeleteAccountTitle'), t('AccountDetailsScreen.DeleteAccountMessage'), [
      {
        text: t('AccountDetailsScreen.CancelButtonText'),
        onPress: () => {},
        style: 'cancel',
      },
      {
        text: t('AccountDetailsScreen.DeleteButtonText'),
        onPress: async () => {
          if (account == null) {
            return;
          }
          await deleteAsync(account.id);
          await queryClient.invalidateQueries([QueryKeys.Accounts, QueryKeys.Transactions]);
          showToast(t('AccountDetailsScreen.DeleteSuccessMessage'));
          navigation.pop();
        },
      },
    ]);
  }, [account, deleteAsync, navigation, queryClient, t]);

  const onEditPress = useCallback(() => navigation.navigate('EditAccountScreen', {accountId: route.params.accountId}), [
    navigation,
    route.params.accountId,
  ]);

  const {opacity, onScroll} = useToolbarOpacity(HEADER_HEIGHT);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButtons>
          <Item
            IconComponent={MaterialCommunityIcons}
            iconName="trash-can-outline"
            iconSize={24}
            onPress={onDeletePress}
          />
          <Item IconComponent={MaterialIcons} iconName="edit" iconSize={24} onPress={onEditPress} />
        </HeaderButtons>
      ),
      headerTitle: () => (
        <Animated.View style={[styles.navigationTitle, {opacity}]}>
          <AccountIcon size={24} type={account?.type!} style={styles.navigationIcon} />
          <Text>{account?.title}</Text>
        </Animated.View>
      ),
    });
  }, [account?.title, account?.type, navigation, onDeletePress, onEditPress, opacity, t]);

  const {data, isLoading, invalidate} = useTransactionModels();

  const [isFiltering, setIsFiltering] = useState(true);
  const [transactions, setTransactions] = useState<TransactionModel[]>([]);
  useEffect(() => {
    setTransactions(data.filter((tr) => tr.outcomeAccount?.id === accountId));
    setIsFiltering(false);
  }, [accountId, data]);

  const {primary} = useNavigatorThemeColors();

  return (
    <View
      style={[styles.container, isDeleting ? styles.disabledView : {}]}
      pointerEvents={isDeleting ? 'none' : 'auto'}>
      <TransactionList
        renderHeader={() => (
          <Card style={styles.listHeader}>
            <View style={[styles.listHeaderIcon, {backgroundColor: primary}]}>
              <AccountIcon type={account?.type!} size={64} color={'#fff'} />
            </View>
            <Text style={styles.title}>{account?.title}</Text>
            <Text style={styles.title}>{account?.balanceFormatted}</Text>
          </Card>
        )}
        headerHeight={HEADER_HEIGHT}
        onScroll={onScroll}
        scrollViewProps={{
          refreshControl: <RefreshControl refreshing={isLoading || isFiltering} onRefresh={invalidate} />,
        }}
        data={transactions}
        onItemPress={(transactionId) =>
          navigation.navigate('Transactions', {screen: 'TransactionDetailsScreen', params: {transactionId}})
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  navigationTitle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  navigationIcon: {
    marginRight: 8,
  },
  container: {
    flex: 1,
  },
  disabledView: {
    opacity: 0.5,
  },
  listHeader: {
    justifyContent: 'center',
    alignItems: 'center',
    height: HEADER_HEIGHT,
  },
  listHeaderIcon: {
    borderRadius: 64,
    padding: 16,
    margin: 16,
  },
  title: {
    fontSize: 20,
    lineHeight: 30,
    marginVertical: 2,
    letterSpacing: 0.15,
  },
});
