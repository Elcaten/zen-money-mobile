import {useNavigation} from '@react-navigation/native';
import * as React from 'react';
import {useCallback, useMemo} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {StyleSheet} from 'react-native';
import {InputHandles} from 'react-native-elements';
import {useAccounts, useInstruments} from '../../../api-hooks';
import {CommentIcon, MinusBoxOutlineIcon, PlusBoxOutlineIcon} from '../../../components';
import {TextInputField} from '../../../components/Field';
import {DateTimeInputField} from '../../../components/Field/DateTimeInputField';
import {NumberInputField} from '../../../components/Field/NumberInputField';
import {ScrollView} from '../../../components/ScrollView';
import {ZenText} from '../../../components/ZenText';
import {useFocusInput} from '../../../hooks';
import {useHeaderButtons} from '../../../hooks/useHeaderButtons';
import {useShakeOnError} from '../../../hooks/useShakeOnError';
import {generateUUID, validateNumericString} from '../../../utils';
import {AccountPicker} from '../../components/AccountPicker/AccountPicker';

export interface TransferAccountModel {
  id: string;
  title: string;
  instrument: number | null;
}

export interface TransferTransaction {
  id: string;
  income: string;
  incomeAccount: TransferAccountModel;
  outcome: string;
  outcomeAccount: TransferAccountModel;
  date: Date;
  comment: string | null;
}

export interface TransferEditorProps {
  defaultValue: TransferTransaction | undefined;
  onSubmit: (tr: TransferTransaction) => void;
  onDelete: () => void;
  recentAccounts: string[];
  disabled: boolean;
}

export const TransferEditor: React.FC<TransferEditorProps> = ({
  defaultValue,
  onSubmit,
  onDelete,
  recentAccounts,
  disabled,
}) => {
  const {data: accounts} = useAccounts();

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: {errors, dirtyFields},
  } = useForm<TransferTransaction>({
    defaultValues: defaultValue ?? {
      id: generateUUID(),
      income: '',
      incomeAccount: accounts![0],
      outcome: '',
      outcomeAccount: accounts![0],
      comment: null,
      date: new Date(),
    },
  });

  //TODO: turn income - outcome sync on
  // const outcome = watch('outcome');
  // useEffect(() => {
  //   if (!dirtyFields.income) {
  //     setValue('income', outcome);
  //   }
  // }, [dirtyFields.income, outcome, setValue]);

  const incomeInputRef = React.useRef<InputHandles>(null);
  const outcomeInputRef = React.useRef<InputHandles>(null);

  const onSavePress = useCallback(() => handleSubmit(onSubmit)(), [handleSubmit, onSubmit]);
  const onDeletePress = useCallback(() => onDelete(), [onDelete]);
  useHeaderButtons(useNavigation(), {onSavePress, onDeletePress: defaultValue ? onDeletePress : undefined, disabled});

  const instruments = useInstruments();
  const watchOutcomeAccount = watch('outcomeAccount');
  const outcomeSymbol = useMemo(
    () => instruments.data?.get(watchOutcomeAccount.instrument!)?.symbol,
    [instruments.data, watchOutcomeAccount],
  );
  const watchIncomeAccount = watch('incomeAccount');
  const incomeSymbol = useMemo(
    () => instruments.data?.get(watchIncomeAccount.instrument!)?.symbol,
    [instruments.data, watchIncomeAccount],
  );

  const {t} = useTranslation();

  useFocusInput(outcomeInputRef);
  useShakeOnError(incomeInputRef, errors.income);
  useShakeOnError(outcomeInputRef, errors.outcome);

  // TODO: refactor this ASAP
  // useEffect(() => {
  //   const defaultOutcomeAccountId = recentAccounts[0];
  //   const defaultOutcomeAccount = defaultOutcomeAccountId
  //     ? accounts?.find((a) => a.id === defaultOutcomeAccountId)!
  //     : accounts![0]!;
  //   setValue('outcomeAccount', defaultOutcomeAccount!);

  //   const defaultIncomeAccountId = recentAccounts[1];
  //   const defaultIncomeAccount = defaultIncomeAccountId
  //     ? accounts?.find((a) => a.id === defaultIncomeAccountId)!
  //     : accounts![1] ?? accounts![0]!;
  //   setValue('incomeAccount', defaultIncomeAccount!);
  // }, [accounts, recentAccounts, setValue]);

  return (
    <ScrollView disabled={disabled} style={styles.wrapper}>
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
          <AccountPicker
            title={t('EditTransactionScreen.From')}
            value={value.id}
            onSelect={onChange}
            recentAccounts={recentAccounts}
          />
        )}
        name="outcomeAccount"
        rules={{required: true}}
      />

      <Controller
        control={control}
        render={({field: {onChange, value}}) => (
          <AccountPicker
            title={t('EditTransactionScreen.To')}
            value={value.id}
            onSelect={onChange}
            recentAccounts={recentAccounts}
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
    </ScrollView>
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
