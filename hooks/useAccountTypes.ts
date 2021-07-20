import {useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import {AccountType} from '../api/models';

export const useAccountTypes = () => {
  const {t} = useTranslation();

  return useMemo(() => {
    return new Map([
      [AccountType.Cash, t('AccountType.Cash')],
      [AccountType.Card, t('AccountType.Card')],
      [AccountType.Checking, t('AccountType.Checking')],
      [AccountType.Deposit, t('AccountType.Deposit')],
      [AccountType.Loan, t('AccountType.Loan')],
    ]);
  }, [t]);
};
