import {useNavigation} from '@react-navigation/native';
import * as React from 'react';
import {useCallback, useMemo} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {StyleSheet} from 'react-native';
import {useAccounts, useInstruments} from '../../../api-hooks';
import {Tag} from '../../../api/models';
import {CoinsIcon, CommentIcon} from '../../../components';
import {TextInputField} from '../../../components/Field';
import {DateTimeInputField} from '../../../components/Field/DateTimeInputField';
import {NumberInputField, NumberInputFieldHandle} from '../../../components/Field/NumberInputField';
import {ScrollView} from '../../../components/ScrollView';
import {ZenText} from '../../../components/ZenText';
import {useShakeOnError} from '../../../hooks';
import {useFocusInput} from '../../../hooks/useFocusInput';
import {useHeaderButtons} from '../../../hooks/useHeaderButtons';
import {generateUUID} from '../../../utils';
import {validateNumericString} from '../../../utils/validate-numeric-string';
import {AccountPicker} from '../../components/AccountPicker/AccountPicker';
import {TagGridPicker} from '../../components/TagGridPicker';

export interface IncomeExpenseTransaction {
  id: string;
  amount: string;
  account: {id: string; title: string; instrument: number | null};
  date: Date;
  tag: string | null;
  comment: string | null;
}

export interface IncomeExpenseEditorProps {
  defaultValue: IncomeExpenseTransaction | undefined;
  onSubmit: (tr: IncomeExpenseTransaction) => void;
  onDelete: () => void;
  tags: Tag[];
  recentAccounts: string[];
  disabled: boolean;
}

export const IncomeExpenseEditor: React.FC<IncomeExpenseEditorProps> = ({
  defaultValue,
  onSubmit,
  onDelete,
  tags,
  disabled,
  recentAccounts,
}) => {
  const {data: accounts} = useAccounts();

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: {errors},
  } = useForm<IncomeExpenseTransaction>({
    defaultValues: defaultValue ?? {
      id: generateUUID(),
      amount: '',
      account: accounts![0],
      tag: null,
      comment: null,
      date: new Date(),
    },
  });

  const onSavePress = useCallback(() => handleSubmit(onSubmit)(), [handleSubmit, onSubmit]);
  const onDeletePress = useCallback(() => onDelete(), [onDelete]);
  useHeaderButtons(useNavigation(), {onSavePress, onDeletePress: defaultValue ? onDeletePress : undefined, disabled});

  const watchAccount = watch('account');
  const instruments = useInstruments();
  const instrumentSymbol = useMemo(() => instruments.data?.get(watchAccount!.instrument!)?.symbol, [
    instruments.data,
    watchAccount,
  ]);

  const amountInputRef = React.useRef<NumberInputFieldHandle>(null);

  const {t} = useTranslation();

  useShakeOnError(amountInputRef, errors.amount);
  useFocusInput(amountInputRef);

  //TODO: turn this on again
  // useEffect(() => {
  //   const defaultAccountId = first(recentAccounts);
  //   const defaultAccount = defaultAccountId ? accounts?.find((a) => a.id === defaultAccountId)! : first(accounts);
  //   setValue('account', defaultAccount!);
  // }, [accounts, recentAccounts, setValue]);

  return (
    <ScrollView disabled={disabled} style={styles.flexFill}>
      <Controller
        control={control}
        render={({field}) => (
          <NumberInputField
            ref={amountInputRef}
            field={field}
            leftIcon={() => <CoinsIcon />}
            rightIcon={() => <ZenText>{instrumentSymbol}</ZenText>}
          />
        )}
        name="amount"
        rules={{validate: validateNumericString}}
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
          <AccountPicker title={value.title} value={value.id} recentAccounts={recentAccounts} onSelect={onChange} />
        )}
        name="account"
        rules={{required: true}}
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
  flexFill: {
    flex: 1,
  },
});
