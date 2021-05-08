import {HeaderBackButton} from '@react-navigation/stack';
import * as React from 'react';
import {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import {useAccounts, useTags} from '../../api-hooks';
import {useAddIncomeTransaction} from '../../api-hooks/useMutateTransaction';
import {Text} from '../../components';
import {AddTransactionScreenProps} from '../../types';
import {IncomeEditor, IncomeEditorHandles, IncomeTransaction} from './IncomeEditor';
import {TransactionTypePicker} from './TransactionTypePicker';

export const TransactionDetailsScreen: React.FC<AddTransactionScreenProps> = ({route, navigation}) => {
  const accounts = useAccounts();

  const emptyIncome: IncomeTransaction = {
    income: '',
    incomeAccount: accounts.data![0],
    parentTag: null,
    childTag: null,
    comment: null,
    date: new Date(),
  };

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<IncomeTransaction>({defaultValues: emptyIncome});
  const {t} = useTranslation();

  const tags = useTags();
  const tagArray = useMemo(() => (tags?.data.values ? Array.from(tags?.data.values()) : []), [tags?.data]);

  const [transactionType, setTransactionType] = useState(route.params.transactionType);

  const ref = useRef<IncomeEditorHandles>(null);
  useEffect(() => {
    if (errors.income) {
      ref.current?.shakeIncome();
    }
  }, [errors.income]);

  const add = useAddIncomeTransaction();
  const onSavePress = useCallback(
    (income: IncomeTransaction) => {
      add.mutateAsync(income);
    },
    [add],
  );

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <HeaderButtons>
          <HeaderBackButton onPress={() => navigation.pop()} />
          <TransactionTypePicker onSelect={setTransactionType} selectedType={transactionType} style={{width: 130}} />
        </HeaderButtons>
      ),
      headerRight: () => (
        <HeaderButtons>
          <Item title={t('Screen.AddTransaction.Save')} onPress={handleSubmit(onSavePress)} />
        </HeaderButtons>
      ),
    });
  }, [handleSubmit, navigation, onSavePress, t, transactionType]);

  return (
    <React.Fragment>
      <IncomeEditor ref={ref} control={control} accounts={accounts.data ?? []} tags={tagArray} />
    </React.Fragment>
  );
};
