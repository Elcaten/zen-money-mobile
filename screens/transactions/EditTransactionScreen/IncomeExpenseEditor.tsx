import * as React from 'react';
import {useEffect, useImperativeHandle, useMemo} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {ScrollView, StyleSheet} from 'react-native';
import {InputHandles} from 'react-native-elements';
import {useAccounts, useInstruments, useTags} from '../../../api-hooks';
import {Transaction, UserAccount} from '../../../api/models';
import {CommentIcon, Input, Text} from '../../../components';
import {DateTimeInput} from '../../../components/DateTimeInput';
import {ListItem} from '../../../components/ListItem';
import {TagGridPicker} from '../../components/TagGridPicker';
import {AccountPicker} from './AccountPicker';

export type IncomeExpenseTransaction = Pick<Transaction, 'comment'> & {
  amount: string;
  account: UserAccount;
  date: Date;
  tag: string | null;
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
      tag: null,
      comment: null,
      date: new Date(),
    },
  });

  const watchInstrument = watch('account.instrument');
  const instruments = useInstruments();
  const instrumentSymbol = useMemo(() => instruments.data?.get(watchInstrument!)?.symbol, [
    instruments.data,
    watchInstrument,
  ]);

  const amountInputRef = React.useRef<InputHandles>(null);
  useEffect(() => {
    if (errors.amount) {
      amountInputRef.current?.shake();
    }
  }, [errors.amount]);

  useImperativeHandle(ref, () => ({submit: () => handleSubmit(onSubmit)()}), [handleSubmit, onSubmit]);

  const {t} = useTranslation();

  return (
    <ScrollView style={styles.container}>
      <Controller
        control={control}
        render={({field: {onChange, onBlur, value}}) => (
          <ListItem bottomDivider>
            <Input
              ref={amountInputRef}
              value={value.toString()}
              onBlur={onBlur}
              onChangeText={onChange}
              rightIcon={<Text>{instrumentSymbol}</Text>}
            />
          </ListItem>
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
          <TagGridPicker tags={tags} value={value} onValueChange={(tag) => onChange(tag?.id)} />
        )}
        name="tag"
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
          <ListItem bottomDivider>
            <Input
              placeholder={t('EditTransactionScreen.Comment')}
              value={value ?? ''}
              onChangeText={onChange}
              onBlur={onBlur}
              leftIcon={<CommentIcon size={24} />}
            />
          </ListItem>
        )}
        name="comment"
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export const IncomeExpenseEditor = React.forwardRef(IncomeExpenseEditorComponent);
