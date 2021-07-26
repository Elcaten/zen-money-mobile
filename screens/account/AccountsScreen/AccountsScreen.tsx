import {Ionicons} from '@expo/vector-icons';
import * as React from 'react';
import {useCallback, useLayoutEffect, useMemo, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {FlatList, ListRenderItemInfo, StyleSheet} from 'react-native';
import Collapsible from 'react-native-collapsible';
import {Item} from 'react-navigation-header-buttons';
import {AccountModel, useAccountModels} from '../../../api-hooks';
import {AccountType} from '../../../api/models';
import {View} from '../../../components';
import {ZenText} from '../../../components/ZenText';
import {useGrandTotal} from '../../../hooks/useGrandTotal';
import {useHeaderButtons} from '../../../hooks/useHeaderButtons';
import {useHeaderTitle} from '../../../hooks/useHeaderTitle';
import {useNavigatorThemeColors} from '../../../themes';
import {AccountsScreenProps} from '../../../types';
import {extractId} from '../../../utils';
import {AccountListItem} from './AccountListItem';

export const AccountsScreen: React.FC<AccountsScreenProps> = ({navigation}) => {
  const {data, isLoading, invalidate} = useAccountModels();
  const accounts = useMemo(() => data, [data]);

  const [showArchived, setShowArchived] = useState(false);
  const archivedAccounts = useMemo(() => accounts.filter((a) => a.archive && a.type !== AccountType.Debt), [accounts]);
  const displayShowArchivedButton = archivedAccounts.length > 0;
  const nonArchivedAccounts = useMemo(() => accounts.filter((a) => !a.archive && a.type !== AccountType.Debt), [
    accounts,
  ]);

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
            <ZenText style={[styles.toggleText, {color: primary}]} onPress={() => setShowArchived((v) => !v)}>
              {showArchived ? t('AccountsScreen.Collapse') : t('AccountsScreen.ShowArchived')}
            </ZenText>
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
  const grandTotal = useGrandTotal();

  useHeaderButtons(navigation, {
    onAddPress,
    renderButtons,
    renderButtonPosition: 'right',
  });
  useHeaderTitle(navigation, grandTotal.toString());

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
