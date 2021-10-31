import {useMutation} from 'react-query';
import {deleteEntity} from '../api/deleteEntity';
import {EntityType} from '../api/entyity-type';
import {Transaction} from '../api/models';
import {postEntity} from '../api/postEntity';
import {IncomeExpenseTransaction, TransferTransaction} from '../screens/transactions/EditTransactionScreen';
import {toApiDate} from '../utils';
import {useMe} from './useMe';

export const useMutateIncomeTransaction = () => {
  const user = useMe();

  return useMutation((transactionModels: IncomeExpenseTransaction[]) => {
    const now = new Date();

    const transactions: Transaction[] = transactionModels.map((transaction) => ({
      changed: now.getTime(),
      comment: transaction.comment,
      created: now.getTime(),
      date: toApiDate(transaction.date),
      id: transaction.id,
      income: Number.parseInt(transaction.amount, 10),
      incomeAccount: transaction.account.id,
      incomeInstrument: transaction.account.instrument,
      outcome: 0,
      outcomeAccount: transaction.account.id,
      outcomeInstrument: transaction.account.instrument,
      tag: transaction.tag ? [transaction.tag] : null,
      user: user.data!.id,

      deleted: false,
      hold: false,
      incomeBankID: null,
      latitude: null,
      longitude: null,
      mcc: null,
      merchant: null,
      opIncome: null,
      opIncomeInstrument: null,
      opOutcome: null,
      opOutcomeInstrument: null,
      originalPayee: null,
      outcomeBankID: null,
      payee: null,
      reminderMarker: null,
    }));

    return postEntity<Transaction>(EntityType.Transaction, ...transactions);
  });
};

export const useMutateExpenseTransaction = () => {
  const user = useMe();

  return useMutation((transactionModels: IncomeExpenseTransaction[]) => {
    const now = new Date();

    const transactions: Transaction[] = transactionModels.map((transaction) => ({
      changed: now.getTime(),
      comment: transaction.comment,
      created: now.getTime(),
      date: toApiDate(transaction.date),
      id: transaction.id,
      income: 0,
      incomeAccount: transaction.account.id,
      incomeInstrument: transaction.account.instrument,
      outcome: Number.parseInt(transaction.amount, 10),
      outcomeAccount: transaction.account.id,
      outcomeInstrument: transaction.account.instrument,
      tag: transaction.tag ? [transaction.tag] : null,
      user: user.data!.id,

      deleted: false,
      hold: false,
      incomeBankID: null,
      latitude: null,
      longitude: null,
      mcc: null,
      merchant: null,
      opIncome: null,
      opIncomeInstrument: null,
      opOutcome: null,
      opOutcomeInstrument: null,
      originalPayee: null,
      outcomeBankID: null,
      payee: null,
      reminderMarker: null,
    }));

    return postEntity<Transaction>(EntityType.Transaction, ...transactions);
  });
};

export const useMutateTransferTransaction = () => {
  const user = useMe();

  return useMutation((transactionModels: TransferTransaction[]) => {
    const now = new Date();

    const transactions: Transaction[] = transactionModels.map((transaction) => ({
      changed: now.getTime(),
      comment: transaction.comment,
      created: now.getTime(),
      date: toApiDate(transaction.date),
      id: transaction.id,
      income: Number.parseInt(transaction.income, 10),
      incomeAccount: transaction.incomeAccount.id,
      incomeInstrument: transaction.incomeAccount.instrument,
      outcome: Number.parseInt(transaction.outcome, 10),
      outcomeAccount: transaction.outcomeAccount.id,
      outcomeInstrument: transaction.outcomeAccount.instrument,
      user: user.data!.id,

      deleted: false,
      hold: false,
      incomeBankID: null,
      latitude: null,
      longitude: null,
      mcc: null,
      merchant: null,
      opIncome: null,
      opIncomeInstrument: null,
      opOutcome: null,
      opOutcomeInstrument: null,
      originalPayee: null,
      outcomeBankID: null,
      payee: null,
      reminderMarker: null,
      tag: null,
    }));

    return postEntity<Transaction>(EntityType.Transaction, ...transactions);
  });
};

export const useDeleteTransaction = () => {
  const user = useMe();
  const {isLoading, mutateAsync} = useMutation((transactionId: string) =>
    deleteEntity(user.data!.id, EntityType.Transaction, transactionId),
  );
  return {isDeleting: isLoading, deleteAsync: mutateAsync};
};
