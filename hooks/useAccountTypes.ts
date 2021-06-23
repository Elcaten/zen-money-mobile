import {useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import {AccountType} from '../api/models';

export const useAccountTypes = () => {
  const {t} = useTranslation();

  return useMemo(() => {
    return new Map([
      [AccountType.Cash, t('Components.AccountTypePicker.Cash')],
      [AccountType.Card, t('Components.AccountTypePicker.Card')],
      [AccountType.Checking, t('Components.AccountTypePicker.Checking')],
      [AccountType.Deposit, t('Components.AccountTypePicker.Deposit')],
      [AccountType.Loan, t('Components.AccountTypePicker.Loan')],
    ]);
  }, [t]);
};
