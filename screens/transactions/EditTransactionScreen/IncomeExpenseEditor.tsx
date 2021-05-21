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

export type IncomeExpenseTransaction = Pick<Transaction, 'comment'> & {
  amount: string;
  account: UserAccount;
  date: Date;
  parentTag?: string | null;
  childTag?: string | null;
};

export interface IncomeExpenseEditorHandles {
  submit: () => void;
}

export interface IncomeExpenseEditorProps {
  onSubmit: (t: IncomeExpenseTransaction) => void;
}

const IncomeExpenseEditorComponent: React.ForwardRefRenderFunction<
  IncomeExpenseEditorHandles,
  IncomeExpenseEditorProps
> = ({onSubmit}, ref) => {
  const {data: accounts} = useAccounts();
  const {data: tagDict} = useTags();
  const tags = useMemo(() => (tagDict.values ? Array.from(tagDict.values()) : []), [tagDict]);

  const {
    control,
    handleSubmit,
    watch,
    formState: {errors},
  } = useForm<IncomeExpenseTransaction>({
    defaultValues: {
      amount: '',
      account: accounts![0],
      parentTag: null,
      childTag: null,
      comment: null,
      date: new Date(),
    },
  });

  const watchInstrument = watch('account.instrument');
  const instruments = useInstruments();
  const instrumentSymbol = useMemo(() => instruments.data?.get(watchInstrument)?.symbol, [
    instruments.data,
    watchInstrument,
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

  const amountInputRef = React.useRef<InputHandles>(null);
  useEffect(() => {
    if (errors.amount) {
      amountInputRef.current?.shake();
    }
  }, [errors.amount]);

  useImperativeHandle(ref, () => ({submit: () => handleSubmit(onSubmit)()}), [handleSubmit, onSubmit]);
  const {t} = useTranslation();
  return (
    <View style={styles.container}>
      <Controller
        control={control}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            ref={amountInputRef}
            value={value.toString()}
            onBlur={onBlur}
            onChangeText={onChange}
            rightIcon={<Text>{instrumentSymbol}</Text>}
          />
        )}
        name="amount"
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
        name="account"
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

export const IncomeExpenseEditor = React.forwardRef(IncomeExpenseEditorComponent);
