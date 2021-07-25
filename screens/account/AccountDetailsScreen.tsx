import * as React from 'react';
import {useCallback, useEffect, useLayoutEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Animated, RefreshControl, StyleSheet} from 'react-native';
import {useQueryClient} from 'react-query';
import {TransactionModel, useAccountModels, useTransactionModels} from '../../api-hooks';
import {QueryKeys} from '../../api-hooks/query-keys';
import {useDeleteAccount} from '../../api-hooks/useMutateAccount';
import {Text, View} from '../../components';
import {Card} from '../../components/Card';
import {useToolbarOpacity} from '../../hooks';
import {useHeaderButtons} from '../../hooks/useHeaderButtons';
import {useDeletePress} from '../../hooks/useOnDeletePress';
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

  const {deleteAsync, isDeleting} = useDeleteAccount();

  const onDeleteConfirm = useCallback(async () => {
    if (account == null) {
      return;
    }
    await deleteAsync(account.id);
    await queryClient.invalidateQueries([QueryKeys.Accounts, QueryKeys.Transactions]);
    showToast(t('AccountDetailsScreen.DeleteSuccessMessage'));
    navigation.pop();
  }, [account, deleteAsync, navigation, queryClient, t]);

  const onDeletePress = useDeletePress(
    t('AccountDetailsScreen.DeleteAccountTitle'),
    t('AccountDetailsScreen.DeleteAccountMessage'),
    onDeleteConfirm,
  );

  const onEditPress = useCallback(() => navigation.navigate('EditAccountScreen', {accountId: route.params.accountId}), [
    navigation,
    route.params.accountId,
  ]);

  useHeaderButtons(navigation, {onDeletePress, onEditPress});

  const {opacity, onScroll} = useToolbarOpacity(HEADER_HEIGHT);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <Animated.View style={[styles.navigationTitle, {opacity}]}>
          <AccountIcon size={24} type={account?.type!} style={styles.navigationIcon} />
          <Text>{account?.title}</Text>
        </Animated.View>
      ),
    });
  }, [account?.title, account?.type, navigation, opacity]);

  const {data, isLoading, invalidate} = useTransactionModels();

  const [isFiltering, setIsFiltering] = useState(true);
  const [transactions, setTransactions] = useState<TransactionModel[]>([]);
  useEffect(() => {
    setTransactions(data.filter((tr) => tr.outcomeAccount?.id === accountId));
    setIsFiltering(false);
  }, [accountId, data]);

  const {onPrimary, secondary} = useNavigatorThemeColors();

  return (
    <View
      style={[styles.container, isDeleting ? styles.disabledView : {}]}
      pointerEvents={isDeleting ? 'none' : 'auto'}>
      <TransactionList
        renderHeader={() => (
          <Card style={styles.listHeader}>
            <View style={[styles.listHeaderIcon, {backgroundColor: secondary}]}>
              <AccountIcon type={account?.type!} size={64} color={onPrimary} />
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
