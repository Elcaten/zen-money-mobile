import {useMutation} from 'react-query';
import {deleteEntity} from '../api/deleteEntity';
import {EntityType} from '../api/entyity-type';
import {Transaction} from '../api/models';
import {postEntity} from '../api/postEntity';
import {IncomeExpenseTransaction, TransferTransaction} from '../screens/transactions/EditTransactionScreen';
import {generateUUID} from '../utils/generate-uuid';
import {toApiDate} from '../utils/to-api-date';
import {useMe} from './useMe';

export const useMutateIncomeTransaction = () => {
  const user = useMe();

  return useMutation((transaction: IncomeExpenseTransaction) => {
    const now = new Date();
    const amount = Number.parseInt(transaction.amount, 10);

    if (isNaN(amount)) {
      return Promise.reject('Invalid income');
    }

    const tr: Transaction = {
      changed: now.getTime(),
      comment: transaction.comment,
      created: now.getTime(),
      date: toApiDate(transaction.date),
      id: generateUUID(),
      income: amount,
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
    };

    return postEntity<Transaction>(EntityType.Transaction, tr);
  });
};

export const useMutateExpenseTransaction = () => {
  const user = useMe();

  return useMutation((transaction: IncomeExpenseTransaction) => {
    const now = new Date();
    const amount = Number.parseInt(transaction.amount, 10);

    if (isNaN(amount)) {
      return Promise.reject('Invalid outcome');
    }

    return postEntity<Transaction>(EntityType.Transaction, {
      changed: now.getTime(),
      comment: transaction.comment,
      created: now.getTime(),
      date: toApiDate(transaction.date),
      id: generateUUID(),
      income: 0,
      incomeAccount: transaction.account.id,
      incomeInstrument: transaction.account.instrument,
      outcome: amount,
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
    });
  });
};

export const useMutateTransferTransaction = () => {
  const user = useMe();

  return useMutation((transfer: TransferTransaction) => {
    const now = new Date();
    const incomeAmount = Number.parseInt(transfer.income, 10);
    const outcomeAmount = Number.parseInt(transfer.outcome, 10);

    if (isNaN(incomeAmount)) {
      return Promise.reject('Invalid income');
    }
    if (isNaN(outcomeAmount)) {
      return Promise.reject('Invalid outcome');
    }

    return postEntity<Transaction>(EntityType.Transaction, {
      changed: now.getTime(),
      comment: transfer.comment,
      created: now.getTime(),
      date: toApiDate(transfer.date),
      id: generateUUID(),
      income: incomeAmount,
      incomeAccount: transfer.incomeAccount.id,
      incomeInstrument: transfer.incomeAccount.instrument,
      outcome: outcomeAmount,
      outcomeAccount: transfer.outcomeAccount.id,
      outcomeInstrument: transfer.outcomeAccount.instrument,
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
    });
  });
};

export const useDeleteTransaction = () => {
  const user = useMe();
  const {isLoading, mutateAsync} = useMutation((transactionId: string) =>
    deleteEntity(user.data!.id, EntityType.Transaction, transactionId),
  );
  return {isDeleting: isLoading, deleteAsync: mutateAsync};
};
