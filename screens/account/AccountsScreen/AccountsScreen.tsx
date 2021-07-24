import {Ionicons} from '@expo/vector-icons';
import * as React from 'react';
import {useCallback, useLayoutEffect, useMemo, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {FlatList, ListRenderItemInfo, StyleSheet} from 'react-native';
import Collapsible from 'react-native-collapsible';
import {Item} from 'react-navigation-header-buttons';
import {AccountModel, useAccountModels, useInstruments, useMe} from '../../../api-hooks';
import {AccountType} from '../../../api/models';
import {Text, View} from '../../../components';
import {useCurrencyFormat} from '../../../hooks';
import {useHeaderButtons} from '../../../hooks/useHeaderButtons';
import {useNavigatorThemeColors} from '../../../themes';
import {AccountsScreenProps} from '../../../types';
import {extractId} from '../../../utils';
import {AccountListItem} from './AccountListItem';

export const AccountsScreen: React.FC<AccountsScreenProps> = ({navigation}) => {
  const {data, isLoading, invalidate} = useAccountModels();
  const accounts = useMemo(() => data.filter((a) => a.type !== AccountType.Debt), [data]);

  const {data: instruments} = useInstruments();
  const {data: user} = useMe();
  const formatCurrency = useCurrencyFormat();
  const grandTotal = useMemo(() => {
    const userCurrency = instruments.get(user?.currency!);
    if (!userCurrency) {
      return 0;
    }
    const totalAmount = accounts.reduce((prev, curr) => {
      return prev + (curr.balance * instruments.get(curr.instrument!)?.rate!) / userCurrency.rate!;
    }, 0);
    return formatCurrency(totalAmount, userCurrency.symbol, 0);
  }, [accounts, formatCurrency, instruments, user?.currency]);

  const [showArchived, setShowArchived] = useState(false);
  const archivedAccounts = useMemo(() => accounts.filter((a) => a.archive), [accounts]);
  const displayShowArchivedButton = archivedAccounts.length > 0;
  const nonArchivedAccounts = useMemo(() => accounts.filter((a) => !a.archive), [accounts]);

  const renderAccountItem = React.useCallback(
    (info: ListRenderItemInfo<AccountModel>) => (
      <AccountListItem
        account={info.item}
        onPress={() => navigation.navigate('AccountDetailsScreen', {accountId: info.item.id})}
      />
    ),
    [navigation],
  );

  const {primary} = useNavigatorThemeColors();
  const {t} = useTranslation();
  const renderFooter = useCallback(() => {
    return (
      <View>
        {displayShowArchivedButton && (
          <View style={styles.toggleContainer}>
            <Text style={[styles.toggleText, {color: primary}]} onPress={() => setShowArchived((v) => !v)}>
              {showArchived ? t('AccountsScreen.Collapse') : t('AccountsScreen.ShowArchived')}
            </Text>
          </View>
        )}
        <Collapsible collapsed={!showArchived}>
          <FlatList data={archivedAccounts} keyExtractor={extractId} renderItem={renderAccountItem} />
        </Collapsible>
      </View>
    );
  }, [archivedAccounts, displayShowArchivedButton, primary, renderAccountItem, showArchived, t]);

  const renderButtons = useCallback(
    () => (
      <Item
        title=""
        IconComponent={Ionicons}
        iconName="pie-chart-outline"
        iconSize={24}
        onPress={() => navigation.navigate('AccountOverviewScreen')}
      />
    ),
    [navigation],
  );
  const onAddPress = useCallback(() => navigation.navigate('EditAccountScreen', {accountId: undefined}), [navigation]);

  useHeaderButtons(navigation, {
    onAddPress,
    renderButtonPosition: 'right',
    renderButtons: renderButtons,
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: grandTotal.toString(),
    });
  }, [grandTotal, navigation]);

  return (
    <FlatList
      onRefresh={invalidate}
      refreshing={isLoading}
      data={nonArchivedAccounts}
      keyExtractor={extractId}
      renderItem={renderAccountItem}
      ListFooterComponent={renderFooter()}
    />
  );
};

const styles = StyleSheet.create({
  toggleContainer: {
    alignItems: 'flex-end',
  },
  toggleText: {
    padding: 12,
  },
});
