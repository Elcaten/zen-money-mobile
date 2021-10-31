import React, {useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import {ListRenderItem, SectionList, SectionListData} from 'react-native';
import {useAccounts} from '../../../api-hooks';
import {AccountType, UserAccount} from '../../../api/models';
import {OptionListItem} from '../../../components/ListItem';
import {SectionHeader} from '../../../components/SectionHeader';
import {ZenFormSheet} from '../../../components/ZenFormSheet';
import {notNull} from '../../../utils';

export interface AccountPickerDialogProps {
  visible: boolean;
  onRequestClose: () => void;
  recentAccounts?: string[];
  value: string | undefined;
  onSelect: (account: UserAccount) => void;
}

export const AccountPickerDialog: React.FC<AccountPickerDialogProps> = ({
  onSelect,
  recentAccounts: recentAccountsProp,
  value,
  visible,
  onRequestClose,
}) => {
  const {data: accounts} = useAccounts();

  const recentAccounts = useMemo(
    () =>
      recentAccountsProp
        ?.map((id) => accounts?.find((a) => a.id === id))
        .filter(notNull)
        .sort(byTitle) ?? [],
    [accounts, recentAccountsProp],
  );

  const restAccounts = useMemo(() => {
    const recentAccountSet = new Set(recentAccountsProp);
    return (accounts ?? []).filter((a) => !recentAccountSet.has(a.id) && a.type !== AccountType.Debt).sort(byTitle);
  }, [accounts, recentAccountsProp]);

  const renderItem: ListRenderItem<UserAccount> = ({item}) => {
    return (
      <OptionListItem
        title={item.title}
        onPress={() => {
          onSelect(item);
          onRequestClose();
        }}
        checked={item.id === value}
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
      title: t('AccountPickerDialog.RecentAccounts'),
    },
    {
      data: restAccounts,
      title: t('AccountPickerDialog.Accounts'),
    },
  ];

  return (
    <ZenFormSheet visible={visible} onRequestClose={onRequestClose}>
      <ZenFormSheet.Header>
        <ZenFormSheet.CancelButton onPress={onRequestClose} />
      </ZenFormSheet.Header>
      <SectionList sections={sections} renderItem={renderItem} renderSectionHeader={renderSectionHeader} />
    </ZenFormSheet>
  );
};

const byTitle = (a1: UserAccount, a2: UserAccount) => a1.title.localeCompare(a2.title);
