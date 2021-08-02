import {useFocusEffect, useNavigation} from '@react-navigation/native';
import * as React from 'react';
import {useCallback, useEffect, useMemo} from 'react';
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
import {NumberInputField} from '../../../components/Field/NumberInputField';
import {PickerListItem} from '../../../components/ListItem';
import {ZenText} from '../../../components/ZenText';
import {ZenTextInputHandles} from '../../../components/ZenTextInput/ZenTextInput';
import {useHeaderButtons} from '../../../hooks/useHeaderButtons';
import {EditTransactionScreenNavigationProp} from '../../../types';
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

  const {mutateAsync: mutateIncomeAsync} = useMutateIncomeTransaction();
  const {mutateAsync: mutateExpenseAsync} = useMutateExpenseTransaction();

  const onSavePress = useMemo(
    () =>
      handleSubmit(async (tr: IncomeExpenseTransaction) => {
        const {success} = type === 'income' ? await mutateIncomeAsync(tr) : await mutateExpenseAsync(tr);
        onSubmit(success);
      }),
    [handleSubmit, mutateExpenseAsync, mutateIncomeAsync, onSubmit, type],
  );

  useHeaderButtons(useNavigation(), {onSavePress});

  const watchInstrument = watch('account.instrument');
  const instruments = useInstruments();
  const instrumentSymbol = useMemo(() => instruments.data?.get(watchInstrument!)?.symbol, [
    instruments.data,
    watchInstrument,
  ]);

  const amountInputRef = React.useRef<ZenTextInputHandles>(null);
  useEffect(() => {
    if (errors.amount) {
      amountInputRef.current?.shake();
    }
  }, [errors.amount]);

  const {t} = useTranslation();
  const navigation = useNavigation<EditTransactionScreenNavigationProp>();

  useFocusEffect(
    useCallback(() => {
      setTimeout(() => {
        if (amountInputRef.current) {
          amountInputRef.current.focus();
        }
      }, 0);
    }, [amountInputRef]),
  );

  return (
    <ScrollView style={styles.flexFill}>
      <Controller
        control={control}
        render={({field}) => (
          <NumberInputField
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
