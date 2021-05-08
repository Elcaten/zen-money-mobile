import {HeaderBackButton} from '@react-navigation/stack';
import dayjs from 'dayjs';
import * as React from 'react';
import {useCallback, useEffect, useMemo, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Divider} from 'react-native-elements';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import {useQueryClient} from 'react-query';
import {useAccounts, useMe, useTags} from '../../api-hooks';
import {useAddTransaction} from '../../api-hooks/useAddTransaction';
import {Account, Tag, Transaction} from '../../api/models';
import {USERS} from '../../auth';
import {CommentIcon, Input, Text, View} from '../../components';
import {DateTimeInput} from '../../components/DateTimeInput';
import {AddTransactionScreenProps} from '../../types';
import {groupBy} from '../../utils';
import {generateUUID} from '../../utils/generate-uuid';
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

  const user = useMe();

  const add = useAddTransaction();
  const onSavePress = useCallback(() => {
    const now = new Date();
    const tr: Transaction = {
      changed: now.getTime() + 1,
      comment: 'TEST COMENT',
      created: now.getTime(),
      date: dayjs(date).format('YYYY-MM-DD'),
      deleted: false,
      hold: false,
      id: generateUUID(),
      income: 0,
      incomeAccount: account!.id,
      incomeBankID: null,
      incomeInstrument: account!.instrument,
      latitude: null,
      longitude: null,
      mcc: null,
      merchant: null,
      opIncome: null,
      opIncomeInstrument: null,
      opOutcome: null,
      opOutcomeInstrument: null,
      originalPayee: null,
      outcome: 100,
      outcomeAccount: account!.id,
      outcomeBankID: null,
      outcomeInstrument: account!.instrument,
      payee: null,
      reminderMarker: null,
      tag: null,
      user: user.data!.id,
    };
    // console.log(tr);
    add.mutateAsync(tr);
  }, [account, add, date, user.data]);

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
          <Item title={t('Screen.AddTransaction.Save')} onPress={onSavePress} />
        </HeaderButtons>
      ),
    });
  }, [navigation, onSavePress, t, transactionType]);

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
