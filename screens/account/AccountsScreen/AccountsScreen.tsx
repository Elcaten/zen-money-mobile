import * as React from 'react';
import {useCallback, useLayoutEffect, useMemo, useState} from 'react';
import {FlatList, ListRenderItemInfo, StyleSheet} from 'react-native';
import Collapsible from 'react-native-collapsible';
import {AccountModel, useAccountModels} from '../../../api-hooks';
import {Text, View} from '../../../components';
import {useNavigatorThemeColors} from '../../../themes';
import {AccountsScreenProps} from '../../../types';
import {extractId} from '../../../utils';
import {useTranslation} from 'react-i18next';

import {AccountListItem} from './AccountListItem';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import {Ionicons, MaterialIcons} from '@expo/vector-icons';

export const AccountsScreen: React.FC<AccountsScreenProps> = ({navigation}) => {
  const {data, isLoading, invalidate} = useAccountModels();

  const [showArchived, setShowArchived] = useState(false);
  const archivedAccounts = useMemo(() => data.filter((a) => a.archive), [data]);
  const displayShowArchivedButton = archivedAccounts.length > 0;
  const nonArchivedAccounts = useMemo(() => data.filter((a) => !a.archive), [data]);

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
              {showArchived ? t('Screen.Accounts.Collapse') : t('Screen.Accounts.ShowArchived')}
            </Text>
          </View>
        )}
        <Collapsible collapsed={!showArchived}>
          <FlatList data={archivedAccounts} keyExtractor={extractId} renderItem={renderAccountItem} />
        </Collapsible>
      </View>
    );
  }, [archivedAccounts, displayShowArchivedButton, primary, renderAccountItem, showArchived, t]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButtons>
          <Item
            title={t('Screen.AccountOverview.AccountOverview')}
            IconComponent={Ionicons}
            iconName="pie-chart-outline"
            iconSize={24}
            onPress={() => navigation.navigate('AccountOverviewScreen')}
          />
          <Item
            title={t('Screen.Accounts.AddAccount')}
            IconComponent={MaterialIcons}
            iconName="add"
            iconSize={24}
            onPress={() => navigation.navigate('EditAccountScreen', {accountId: undefined})}
          />
        </HeaderButtons>
      ),
    });
  }, [navigation, t]);

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
