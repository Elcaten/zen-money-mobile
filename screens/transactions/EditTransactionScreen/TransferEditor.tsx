import {useNavigation} from '@react-navigation/native';
import * as React from 'react';
import {useEffect, useMemo} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {StyleSheet} from 'react-native';
import {InputHandles} from 'react-native-elements';
import {useAccounts, useInstruments, useMutateTransferTransaction} from '../../../api-hooks';
import {Transaction, UserAccount} from '../../../api/models';
import {CommentIcon, MinusBoxOutlineIcon, PlusBoxOutlineIcon, View, WalletIcon} from '../../../components';
import {TextInputField} from '../../../components/Field';
import {DateTimeInputField} from '../../../components/Field/DateTimeInputField';
import {NumberInputField} from '../../../components/Field/NumberInputField';
import {PickerListItem} from '../../../components/ListItem';
import {ZenText} from '../../../components/ZenText';
import {useFocusInput} from '../../../hooks';
import {useHeaderButtons} from '../../../hooks/useHeaderButtons';
import {EditTransactionScreenNavigationProp} from '../../../types';
import {validateNumericString} from '../../../utils';

export type TransferTransaction = Pick<Transaction, 'comment'> & {
  income: string;
  incomeAccount: UserAccount;
  outcome: string;
  outcomeAccount: UserAccount;
  date: Date;
};

export const TransferEditor: React.FC<{onSubmit: (success: boolean) => void}> = ({onSubmit}) => {
  const {data: accounts} = useAccounts();

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: {errors, dirtyFields},
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

  const outcome = watch('outcome');
  useEffect(() => {
    if (!dirtyFields.income) {
      setValue('income', outcome);
    }
  }, [dirtyFields.income, outcome, setValue]);

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

  const {mutateAsync: mutateTransferAsync} = useMutateTransferTransaction();
  const onSavePress = useMemo(
    () =>
      handleSubmit(async (tr: TransferTransaction) => {
        const {success} = await mutateTransferAsync(tr);
        onSubmit(success);
      }),
    [handleSubmit, mutateTransferAsync, onSubmit],
  );
  useHeaderButtons(useNavigation(), {onSavePress});

  const instruments = useInstruments();
  const watchOutcomeAccount = watch('outcomeAccount');
  const outcomeSymbol = useMemo(() => instruments.data?.get(watchOutcomeAccount.instrument!)?.symbol, [
    instruments.data,
    watchOutcomeAccount,
  ]);
  const watchIncomeAccount = watch('incomeAccount');
  const incomeSymbol = useMemo(() => instruments.data?.get(watchIncomeAccount.instrument!)?.symbol, [
    instruments.data,
    watchIncomeAccount,
  ]);

  const {t} = useTranslation();
  const navigation = useNavigation<EditTransactionScreenNavigationProp>();

  useFocusInput(outcomeInputRef);

  return (
    <View style={styles.wrapper}>
      <Controller
        control={control}
        render={({field}) => (
          <NumberInputField
            ref={outcomeInputRef}
            field={field}
            leftIcon={() => <MinusBoxOutlineIcon />}
            rightIcon={() => <ZenText>{outcomeSymbol}</ZenText>}
          />
        )}
        name="outcome"
        rules={{validate: validateNumericString}}
      />

      <Controller
        control={control}
        render={({field: {onChange, value}}) => (
          <PickerListItem
            bottomDivider
            leftIcon={() => <WalletIcon />}
            title={value.title}
            onPress={() =>
              navigation.navigate('AccountPickerScreen', {
                value: value.id,
                onSelect: (x) => onChange(accounts?.find((a) => a.id === x)),
                recentAccounts: [],
              })
            }
          />
        )}
        name="outcomeAccount"
        rules={{required: true}}
      />

      <Controller
        control={control}
        render={({field: {onChange, value}}) => (
          <PickerListItem
            bottomDivider
            leftIcon={() => <WalletIcon />}
            title={value.title}
            onPress={() =>
              navigation.navigate('AccountPickerScreen', {
                value: value.id,
                onSelect: (x) => onChange(accounts?.find((a) => a.id === x)),
                recentAccounts: [],
              })
            }
          />
        )}
        name="incomeAccount"
        rules={{required: true}}
      />

      <Controller
        control={control}
        render={({field}) => (
          <NumberInputField
            ref={incomeInputRef}
            field={field}
            leftIcon={() => <PlusBoxOutlineIcon />}
            rightIcon={() => <ZenText>{incomeSymbol}</ZenText>}
          />
        )}
        name="income"
        rules={{validate: validateNumericString}}
      />

      <Controller
        control={control}
        render={({field}) => <DateTimeInputField field={field} />}
        name="date"
        rules={{required: true}}
      />

      <Controller
        control={control}
        render={({field}) => (
          <TextInputField
            field={field}
            placeholder={t('EditTransactionScreen.Comment')}
            leftIcon={() => <CommentIcon />}
          />
        )}
        name="comment"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  col: {
    flex: 1,
  },
});
