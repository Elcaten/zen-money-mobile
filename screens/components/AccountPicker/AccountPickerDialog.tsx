import React, {useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import {ListRenderItem, SectionList, SectionListData} from 'react-native';
import {Overlay} from 'react-native-elements';
import {useAccounts} from '../../../api-hooks';
import {AccountType, UserAccount} from '../../../api/models';
import {OptionListItem} from '../../../components/ListItem';
import {SectionHeader} from '../../../components/SectionHeader';
import {notNull} from '../../../utils';

export interface AccountPickerDialogProps {
  visible: boolean;
  onRequestClose: () => void;
  value: string;
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

  const renderItem: ListRenderItem<UserAccount> = ({item}) => {
    return (
      <OptionListItem
        title={item.title}
        onPress={() => {
          props.onSelect(item);
          props.onRequestClose();
        }}
        checked={item.id === props.value}
      />
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
    <Overlay isVisible={props.visible} animationType="slide" fullScreen={true} onRequestClose={props.onRequestClose}>
      <SectionList sections={sections} renderItem={renderItem} renderSectionHeader={renderSectionHeader} />
    </Overlay>
  );
};

const byTitle = (a1: UserAccount, a2: UserAccount) => a1.title.localeCompare(a2.title);
