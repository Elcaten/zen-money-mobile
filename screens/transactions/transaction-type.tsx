import {useTranslation} from 'react-i18next';

export enum TransactionType {
  Expense = 'Expense',
  Income = 'Income',
  Transfer = 'Transfer',
}

export const useTransactionTypes = () => {
  const {t} = useTranslation();

  return [
    {
      type: TransactionType.Expense,
      label: t('Screen.AddTransaction.Expense'),
    },
    {
      type: TransactionType.Income,
      label: t('Screen.AddTransaction.Income'),
    },
    {
      type: TransactionType.Transfer,
      label: t('Screen.AddTransaction.Transfer'),
    },
  ];
};
