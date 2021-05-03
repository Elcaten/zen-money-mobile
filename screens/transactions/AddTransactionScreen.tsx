import {HeaderBackButton} from '@react-navigation/stack';
import * as React from 'react';
import {useEffect, useMemo, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Divider} from 'react-native-elements';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import {useAccounts, useTags} from '../../api-hooks';
import {Account, Tag} from '../../api/models';
import {CommentIcon, Input, Text, View} from '../../components';
import {DateTimeInput} from '../../components/DateTimeInput';
import {AddTransactionScreenProps} from '../../types';
import {groupBy} from '../../utils';
import {TagPicker, AccountPicker} from '../components';
import {TransactionTypePicker} from '../components/TransactionTypePicker';

export const AddTransactionScreen: React.FC<AddTransactionScreenProps> = ({route, navigation}) => {
  const {t} = useTranslation();

  const tags = useTags();
  const tagArray = useMemo(() => (tags?.data.values ? Array.from(tags?.data.values()) : []), [tags?.data]);
  const tagByParent = useMemo(() => groupBy(tagArray, 'parent'), [tagArray]);

  const rootTags = useMemo(
    () => tagArray.filter((t) => t.parent == null).sort((t1, t2) => t1.title.localeCompare(t2.title)),
    [tagArray],
  );
  const [rootTag, setRootTag] = useState<Tag | null>(null);

  const childTags = useMemo(() => {
    return tagByParent.get(rootTag?.id) ?? [];
  }, [rootTag?.id, tagByParent]);
  const [childTag, setChildTag] = useState<Tag | null>(null);

  const accounts = useAccounts();
  const [account, setAccount] = useState<Account | null>(null);

  const [transactionType, setTransactionType] = useState(route.params.transactionType);

  const [date, setDate] = useState(new Date());

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <HeaderButtons>
          <HeaderBackButton onPress={() => navigation.pop()} />
          <TransactionTypePicker onSelect={setTransactionType} selectedType={transactionType} style={{width: 130}} />
        </HeaderButtons>
      ),
      headerRight: () => (
        <HeaderButtons>
          <Item title={t('Screen.AddTransaction.Save')} onPress={() => {}} />
        </HeaderButtons>
      ),
    });
  }, [navigation, t, transactionType]);

  return (
    <View style={{flex: 1}}>
      <TagPicker tags={rootTags} selectedTag={rootTag} onSelect={setRootTag} />
      <TagPicker enabled={childTags.length > 0} tags={childTags} selectedTag={childTag} onSelect={setChildTag} />
      <AccountPicker accounts={accounts.data ?? []} selectedAccount={account} onSelect={setAccount} />
      <DateTimeInput date={date} onChange={setDate} />
      <Input placeholder={t('Screen.AddTransaction.Comment')} leftIcon={<CommentIcon size={24} />} />
    </View>
  );
};
