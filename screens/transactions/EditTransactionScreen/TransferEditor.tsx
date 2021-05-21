import * as React from 'react';
import {useEffect, useImperativeHandle, useMemo} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {StyleSheet} from 'react-native';
import {InputHandles} from 'react-native-elements';
import {useAccounts, useInstruments} from '../../../api-hooks';
import {Transaction, UserAccount} from '../../../api/models';
import {CommentIcon, Input, Text, View} from '../../../components';
import {DateTimeInput} from '../../../components/DateTimeInput';
import {AccountPicker} from './AccountPicker';

export type TransferTransaction = Pick<Transaction, 'comment'> & {
  income: string;
  incomeAccount: UserAccount;
  outcome: string;
  outcomeAccount: UserAccount;
  date: Date;
};

export interface TransferEditorHandles {
  submit: () => void;
}
export interface TransferEditorProps {
  onSubmit: (t: TransferTransaction) => void;
}

const TransferEditorComponent: React.ForwardRefRenderFunction<TransferEditorHandles, TransferEditorProps> = (
  {onSubmit},
  ref,
) => {
  const {data: accounts} = useAccounts();

  const {
    control,
    handleSubmit,
    watch,
    formState: {errors},
  } = useForm<TransferTransaction>({
    defaultValues: {
      income: '',
      incomeAccount: accounts![0],
      outcome: '',
      outcomeAccount: accounts![0],
      comment: null,
      date: new Date(),
    },
  });

  const incomeInputRef = React.useRef<InputHandles>(null);
  useEffect(() => {
    if (errors.income) {
      incomeInputRef.current?.shake();
    }
  }, [errors.income]);

  const outcomeInputRef = React.useRef<InputHandles>(null);
  useEffect(() => {
    if (errors.outcome) {
      outcomeInputRef.current?.shake();
    }
  }, [errors.outcome]);

  useImperativeHandle(ref, () => ({submit: () => handleSubmit(onSubmit)()}), [handleSubmit, onSubmit]);

  const instruments = useInstruments();
  const watchOutcomeAccount = watch('outcomeAccount');
  const outcomeSymbol = useMemo(() => instruments.data?.get(watchOutcomeAccount.instrument)?.symbol, [
    instruments.data,
    watchOutcomeAccount,
  ]);
  const watchIncomeAccount = watch('incomeAccount');
  const incomeSymbol = useMemo(() => instruments.data?.get(watchIncomeAccount.instrument)?.symbol, [
    instruments.data,
    watchIncomeAccount,
  ]);

  const {t} = useTranslation();
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Controller
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <Input
              ref={outcomeInputRef}
              containerStyle={styles.col}
              value={value.toString()}
              onBlur={onBlur}
              onChangeText={onChange}
              rightIcon={<Text>{outcomeSymbol}</Text>}
            />
          )}
          name="outcome"
          rules={{
            validate: (text) => {
              const num = Number.parseInt(text, 10);
              return !isNaN(num) && num > 0;
            },
          }}
        />
        <Controller
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <Input
              ref={incomeInputRef}
              containerStyle={styles.col}
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
      </View>

      <View style={styles.row}>
        <Controller
          control={control}
          render={({field: {onChange, value}}) => (
            <AccountPicker
              style={styles.col}
              accounts={accounts ?? []}
              selectedAccount={value?.id}
              onSelect={(id) => onChange(accounts?.find((a) => a.id === id))}
            />
          )}
          name="outcomeAccount"
          rules={{required: true}}
        />
        <Controller
          control={control}
          render={({field: {onChange, value}}) => (
            <AccountPicker
              style={styles.col}
              accounts={accounts ?? []}
              selectedAccount={value?.id}
              onSelect={(id) => onChange(accounts?.find((a) => a.id === id))}
            />
          )}
          name="incomeAccount"
          rules={{required: true}}
        />
      </View>

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
  row: {
    flexDirection: 'row',
  },
  col: {
    flex: 1,
  },
});

export const TransferEditor = React.forwardRef(TransferEditorComponent);
