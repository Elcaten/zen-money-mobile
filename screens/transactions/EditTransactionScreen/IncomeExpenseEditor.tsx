import {useNavigation} from '@react-navigation/native';
import * as React from 'react';
import {useEffect, useMemo} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {ScrollView, StyleSheet} from 'react-native';
import {
  useAccounts,
  useInstruments,
  useMutateExpenseTransaction,
  useMutateIncomeTransaction,
  useTags,
} from '../../../api-hooks';
import {Transaction, UserAccount} from '../../../api/models';
import {CoinsIcon, CommentIcon, WalletIcon} from '../../../components';
import {TextInputField} from '../../../components/Field';
import {DateTimeInputField} from '../../../components/Field/DateTimeInputField';
import {NumberInputField, NumberInputFieldHandle} from '../../../components/Field/NumberInputField';
import {PickerListItem} from '../../../components/ListItem';
import {ZenText} from '../../../components/ZenText';
import {useFocusInput} from '../../../hooks/useFocusInput';
import {useHeaderButtons} from '../../../hooks/useHeaderButtons';
import {useStore} from '../../../store/use-store';
import {EditTransactionScreenNavigationProp} from '../../../types';
import {first} from '../../../utils';
import {validateNumericString} from '../../../utils/validate-numeric-string';
import {TagGridPicker} from '../../components/TagGridPicker';

export type IncomeExpenseTransaction = Pick<Transaction, 'comment'> & {
  amount: string;
  account: UserAccount;
  date: Date;
  tag: string | null;
};

export const IncomeExpenseEditor: React.FC<{onSubmit: (success: boolean) => void; type: 'income' | 'expense'}> = ({
  onSubmit,
  type,
}) => {
  const {data: accounts} = useAccounts();
  const {data: tagDict} = useTags();
  const tags = useMemo(() => {
    const allTags = tagDict.values ? Array.from(tagDict.values()) : [];
    return allTags.filter((t) => (type === 'income' ? t.showIncome : t.showOutcome));
  }, [tagDict, type]);

  const {
    control,
    handleSubmit,
    watch,
    setValue,
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

  const {mutateAsync: mutateIncomeAsync} = useMutateIncomeTransaction();
  const {mutateAsync: mutateExpenseAsync} = useMutateExpenseTransaction();
  const addRecentExpenseAccount = useStore.use.addRecentExpenseAccount();
  const addRecentIncomeAccount = useStore.use.addRecentIncomeAccount();

  const onSavePress = useMemo(
    () =>
      handleSubmit(async (tr: IncomeExpenseTransaction) => {
        if (type === 'expense') {
          addRecentExpenseAccount(tr.account.id);
        } else if (type === 'income') {
          addRecentIncomeAccount(tr.account.id);
        }
        const {success} = type === 'income' ? await mutateIncomeAsync(tr) : await mutateExpenseAsync(tr);
        onSubmit(success);
      }),
    [
      addRecentExpenseAccount,
      addRecentIncomeAccount,
      handleSubmit,
      mutateExpenseAsync,
      mutateIncomeAsync,
      onSubmit,
      type,
    ],
  );

  useHeaderButtons(useNavigation(), {onSavePress});

  const watchAccount = watch('account');
  const instruments = useInstruments();
  const instrumentSymbol = useMemo(() => instruments.data?.get(watchAccount!.instrument!)?.symbol, [
    instruments.data,
    watchAccount,
  ]);

  const amountInputRef = React.useRef<NumberInputFieldHandle>(null);
  useEffect(() => {
    if (errors.amount) {
      amountInputRef.current?.shake();
    }
  }, [errors.amount]);

  const {t} = useTranslation();
  const navigation = useNavigation<EditTransactionScreenNavigationProp>();

  useFocusInput(amountInputRef);

  const recentExpenseAccounts = useStore.use.recentExpenseAccounts();
  const recentIncomeAccounts = useStore.use.recentIncomeAccounts();

  useEffect(() => {
    const defaultAccountId = type === 'income' ? first(recentIncomeAccounts) : first(recentExpenseAccounts);
    const defaultAccount = defaultAccountId ? accounts?.find((a) => a.id === defaultAccountId)! : first(accounts);
    setValue('account', defaultAccount!);
  }, [accounts, recentExpenseAccounts, recentIncomeAccounts, setValue, type]);

  return (
    <ScrollView style={styles.flexFill}>
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
          <PickerListItem
            bottomDivider
            leftIcon={() => <WalletIcon />}
            title={value.title}
            onPress={() =>
              navigation.navigate('AccountPickerScreen', {
                value: value.id,
                onSelect: (x) => onChange(accounts?.find((a) => a.id === x)),
                recentAccounts: type === 'expense' ? recentExpenseAccounts : recentIncomeAccounts,
              })
            }
          />
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
