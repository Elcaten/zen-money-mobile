import {useMutation} from 'react-query';
import {EntityType} from '../api/entyity-type';
import {Transaction} from '../api/models';
import {postEntity} from '../api/postEntity';
import {IncomeTransaction, TransferTransaction} from '../screens/transactions';
import {generateUUID} from '../utils/generate-uuid';
import {toApiDate} from '../utils/to-api-date';
import {useMe} from './useMe';

export const useMutateIncomeTransaction = () => {
  const user = useMe();

  return useMutation((income: IncomeTransaction) => {
    const now = new Date();
    const incomeAmount = Number.parseInt(income.income, 10);

    if (isNaN(incomeAmount)) {
      return Promise.reject('Invalid income');
    }

    const transaction: Transaction = {
      changed: now.getTime(),
      comment: income.comment,
      created: now.getTime(),
      date: toApiDate(income.date),
      id: generateUUID(),
      income: incomeAmount,
      incomeAccount: income.incomeAccount.id,
      incomeInstrument: income.incomeAccount.instrument,
      outcome: 0,
      outcomeAccount: income.incomeAccount.id,
      outcomeInstrument: income.incomeAccount.instrument,
      tag: income.childTag ? [income.childTag] : income.parentTag ? [income.parentTag] : null,
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
    return postEntity<Transaction>(EntityType.Transaction, transaction);
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

    const transaction: Transaction = {
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
    };
    return postEntity<Transaction>(EntityType.Transaction, transaction);
  });
};
