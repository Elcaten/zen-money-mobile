import React, {useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import {ListRenderItem, SectionList, SectionListData} from 'react-native';
import {useAccounts} from '../../../api-hooks';
import {AccountType, UserAccount} from '../../../api/models';
import {CheckIcon} from '../../../components';
import {ListItem} from '../../../components/ListItem';
import {SectionHeader} from '../../../components/SectionHeader';
import {ZenOverlay} from '../../../components/ZenOverlay';
import {useNavigatorThemeColors} from '../../../themes';
import {notNull} from '../../../utils';

export interface AccountPickerDialogProps {
  visible: boolean;
  onRequestClose: () => void;
  value: string | null | undefined;
  onSelect: (account: UserAccount) => void;
  recentAccounts: string[];
}

export const AccountPickerDialog: React.FC<AccountPickerDialogProps> = (props) => {
  const {data: accounts} = useAccounts();

  const recentAccounts = useMemo(
    () =>
      props.recentAccounts
        .map((id) => accounts?.find((a) => a.id === id))
        .filter(notNull)
        .sort(byTitle),
    [accounts, props.recentAccounts],
  );

  const restAccounts = useMemo(() => {
    const recentAccountSet = new Set(props.recentAccounts);
    return (accounts ?? []).filter((a) => !recentAccountSet.has(a.id) && a.type !== AccountType.Debt).sort(byTitle);
  }, [accounts, props.recentAccounts]);

  const {primary} = useNavigatorThemeColors();

  const renderItem: ListRenderItem<UserAccount> = ({item}) => {
    return (
      <ListItem
        onPress={() => {
          props.onSelect(item);
          props.onRequestClose();
        }}>
        <ListItem.Content>
          <ListItem.Title>{item.title}</ListItem.Title>
        </ListItem.Content>
        {item.id === props.value ? <CheckIcon size={20} color={primary} /> : <></>}
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

  return (
    <ZenOverlay isVisible={props.visible} animationType="slide" fullScreen={true} onRequestClose={props.onRequestClose}>
      <SectionList sections={sections} renderItem={renderItem} renderSectionHeader={renderSectionHeader} />
    </ZenOverlay>
  );
};

const byTitle = (a1: UserAccount, a2: UserAccount) => a1.title.localeCompare(a2.title);
