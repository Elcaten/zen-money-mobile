import * as React from 'react';
import {useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import {ListRenderItem, SectionList, SectionListData} from 'react-native';
import {useAccounts} from '../../../api-hooks';
import {UserAccount} from '../../../api/models';
import {CheckIcon} from '../../../components';
import {ListItem} from '../../../components/ListItem';
import {SectionHeader} from '../../../components/SectionHeader';
import {useNavigatorThemeColors} from '../../../themes';
import {AccountPickerScreenProps} from '../../../types';
import {notNull} from '../../../utils';

export const AccountPickerScreen: React.FC<AccountPickerScreenProps> = ({route, navigation}) => {
  const accountId = route.params.value;

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
    return (accounts ?? []).filter((a) => !recentAccountSet.has(a.id)).sort(byTitle);
  }, [accounts, route.params.recentAccounts]);

  const {primary} = useNavigatorThemeColors();

  const renderItem: ListRenderItem<UserAccount> = ({item}) => {
    return (
      <ListItem
        onPress={() => {
          route.params.onSelect(item.id);
          navigation.goBack();
        }}>
        <ListItem.Content>
          <ListItem.Title>{item.title}</ListItem.Title>
        </ListItem.Content>
        {item.id === accountId ? <CheckIcon size={20} color={primary} /> : <></>}
      </ListItem>
    );
  };

  const renderSectionHeader = (info: {section: SectionListData<UserAccount, {title: string}>}) => {
    return <SectionHeader text={info.section.title} />;
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
