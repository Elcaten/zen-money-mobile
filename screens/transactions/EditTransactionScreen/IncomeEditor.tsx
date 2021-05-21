import * as React from 'react';
import {useEffect, useImperativeHandle, useMemo, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {StyleSheet} from 'react-native';
import {InputHandles} from 'react-native-elements';
import {useAccounts, useInstruments, useTags} from '../../../api-hooks';
import {UserAccount, Transaction} from '../../../api/models';
import {CommentIcon, Input, Text, View} from '../../../components';
import {DateTimeInput} from '../../../components/DateTimeInput';
import {TagPicker} from '../../components/TagPicker';
import {AccountPicker} from './AccountPicker';

export type IncomeTransaction = Pick<Transaction, 'comment'> & {
  income: string;
  incomeAccount: UserAccount;
  date: Date;
  parentTag?: string | null;
  childTag?: string | null;
};

export interface IncomeEditorHandles {
  submit: () => void;
}

export interface IncomeEditorProps {
  onSubmit: (t: IncomeTransaction) => void;
}

const IncomeEditorComponent: React.ForwardRefRenderFunction<IncomeEditorHandles, IncomeEditorProps> = (
  {onSubmit},
  ref,
) => {
  const {data: accounts} = useAccounts();
  const {data: tagDict} = useTags();
  const tags = useMemo(() => (tagDict.values ? Array.from(tagDict.values()) : []), [tagDict]);

  const {
    control,
    handleSubmit,
    watch,
    formState: {errors},
  } = useForm<IncomeTransaction>({
    defaultValues: {
      income: '',
      incomeAccount: accounts![0],
      parentTag: null,
      childTag: null,
      comment: null,
      date: new Date(),
    },
  });

  const watchIncomeInstrument = watch('incomeAccount.instrument');
  const instruments = useInstruments();
  const incomeSymbol = useMemo(() => instruments.data?.get(watchIncomeInstrument)?.symbol, [
    instruments.data,
    watchIncomeInstrument,
  ]);

  const tagByParent = useMemo(() => tags.groupBy('parent'), [tags]);

  const rootTags = useMemo(
    () => tags.filter((t) => t.parent == null).sort((t1, t2) => t1.title.localeCompare(t2.title)),
    [tags],
  );
  const [rootTagId, setRootTagId] = useState<string | null>(null);

  const childTags = useMemo(() => {
    return tagByParent.get(rootTagId) ?? [];
  }, [rootTagId, tagByParent]);

  const incomeInputRef = React.useRef<InputHandles>(null);
  useEffect(() => {
    if (errors.income) {
      incomeInputRef.current?.shake();
    }
  }, [errors.income]);

  useImperativeHandle(ref, () => ({submit: () => handleSubmit(onSubmit)()}), [handleSubmit, onSubmit]);
  const {t} = useTranslation();
  return (
    <View style={styles.container}>
      <Controller
        control={control}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            ref={incomeInputRef}
            value={value.toString()}
            onBlur={onBlur}
            onChangeText={onChange}
            rightIcon={<Text>{incomeSymbol}</Text>}
          />
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
            accounts={accounts ?? []}
            selectedAccount={value?.id}
            onSelect={(id) => onChange(accounts?.find((a) => a.id === id))}
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
