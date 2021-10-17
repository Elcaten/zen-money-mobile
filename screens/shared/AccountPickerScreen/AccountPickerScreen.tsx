import React, {useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import {ListRenderItem, SectionList, SectionListData} from 'react-native';
import {useAccounts} from '../../../api-hooks';
import {AccountType, UserAccount} from '../../../api/models';
import {OptionListItem} from '../../../components/ListItem';
import {SectionHeader} from '../../../components/SectionHeader';
import {AccountPickerScreenProps} from '../../../types';
import {notNull} from '../../../utils';

export const AccountPickerScreen: React.FC<AccountPickerScreenProps> = ({route, navigation}) => {
  const {data: accounts} = useAccounts();

  const recentAccounts = useMemo(
    () =>
      route.params.recentAccounts
        .map((id) => accounts?.find((a) => a.id === id))
        .filter(notNull)
        .sort(byTitle),
    [accounts, route.params.recentAccounts],
  );

  const restAccounts = useMemo(() => {
    const recentAccountSet = new Set(route.params.recentAccounts);
    return (accounts ?? []).filter((a) => !recentAccountSet.has(a.id) && a.type !== AccountType.Debt).sort(byTitle);
  }, [accounts, route.params.recentAccounts]);

  const renderItem: ListRenderItem<UserAccount> = ({item}) => {
    return (
      <OptionListItem
        title={item.title}
        onPress={() => {
          route.params.onSelect(item);
          navigation.goBack();
        }}
        checked={item.id === route.params.value}
      />
    );
  };

  const renderSectionHeader = (info: {section: SectionListData<UserAccount, {title: string}>}) => {
    const isSingleSectionList = recentAccounts.length === 0 || accounts?.length === 0;
    return isSingleSectionList ? null : <SectionHeader text={info.section.title} />;
  };

  const {t} = useTranslation();
  const sections: SectionListData<UserAccount, {title: string}>[] = [
    {
      data: recentAccounts,
      title: t('AccountPickerScreen.RecentAccounts'),
    },
    {
      data: restAccounts,
      title: t('AccountPickerScreen.Accounts'),
    },
  ];
  return <SectionList sections={sections} renderItem={renderItem} renderSectionHeader={renderSectionHeader} />;
};

const byTitle = (a1: UserAccount, a2: UserAccount) => a1.title.localeCompare(a2.title);
