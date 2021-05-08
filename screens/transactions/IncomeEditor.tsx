import * as React from 'react';
import {Control, Controller} from 'react-hook-form';
import {StyleSheet} from 'react-native';
import {InputHandles} from 'react-native-elements';
import {Account, Tag, Transaction} from '../../api/models';
import {CommentIcon, Input, View} from '../../components';
import {DateTimeInput} from '../../components/DateTimeInput';
import {AccountPicker} from '../components/AccountPicker';
import {TagPicker} from '../components/TagPicker';
import {useTranslation} from 'react-i18next';
import {useMemo, useState} from 'react';
import {groupBy} from '../../utils';

export type IncomeTransaction = Pick<Transaction, 'comment'> & {
  income: string;
  incomeAccount: Account;
  date: Date;
  parentTag?: string | null;
  childTag?: string | null;
};

export interface IncomeEditorHandles {
  shakeIncome: () => void;
}

export interface IncomeEditorProps {
  control: Control<IncomeTransaction>;
  accounts: Account[];
  tags: Tag[];
}

const IncomeEditorComponent: React.ForwardRefRenderFunction<IncomeEditorHandles, IncomeEditorProps> = (
  {control, accounts, tags},
  ref,
) => {
  const tagByParent = useMemo(() => groupBy(tags, 'parent'), [tags]);

  const rootTags = useMemo(
    () => tags.filter((t) => t.parent == null).sort((t1, t2) => t1.title.localeCompare(t2.title)),
    [tags],
  );
  const [rootTagId, setRootTagId] = useState<string | null>(null);

  const childTags = useMemo(() => {
    return tagByParent.get(rootTagId) ?? [];
  }, [rootTagId, tagByParent]);

  const incomeInputRef = React.useRef<InputHandles>(null);
  React.useImperativeHandle(ref, () => ({
    shakeIncome: () => incomeInputRef.current?.shake(),
  }));

  const {t} = useTranslation();
  return (
    <View style={styles.container}>
      <Controller
        control={control}
        render={({field: {onChange, onBlur, value}}) => (
          <Input ref={incomeInputRef} value={value.toString()} onBlur={onBlur} onChangeText={onChange} />
        )}
        name="income"
        rules={{
          validate: (text) => {
            const num = Number.parseInt(text, 10);
            return !isNaN(num) && num > 0;
          },
        }}
      />

      <Controller
        control={control}
        render={({field: {onChange, value}}) => (
          <TagPicker
            tags={rootTags}
            selectedTag={value}
            onSelect={(id) => {
              onChange(id);
              setRootTagId(id);
            }}
          />
        )}
        name="parentTag"
      />

      <Controller
        control={control}
        render={({field: {onChange, value}}) => (
          <TagPicker enabled={childTags.length > 0} tags={childTags} selectedTag={value} onSelect={onChange} />
        )}
        name="childTag"
      />

      <Controller
        control={control}
        render={({field: {onChange, value}}) => (
          <AccountPicker
            accounts={accounts}
            selectedAccount={value?.id}
            onSelect={(id) => onChange(accounts.find((a) => a.id === id))}
          />
        )}
        name="incomeAccount"
        rules={{required: true}}
      />

      <Controller
        control={control}
        render={({field: {onChange, value}}) => <DateTimeInput date={value} onChange={onChange} />}
        name="date"
        rules={{required: true}}
      />

      <Controller
        control={control}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            placeholder={t('Components.IncomeTransactionEditor.Comment')}
            value={value ?? ''}
            onChangeText={onChange}
            onBlur={onBlur}
            leftIcon={<CommentIcon size={24} />}
          />
        )}
        name="comment"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export const IncomeEditor = React.forwardRef(IncomeEditorComponent);
