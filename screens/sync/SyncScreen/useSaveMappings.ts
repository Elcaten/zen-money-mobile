import {useCallback} from 'react';
import {DeepPartial} from 'react-hook-form';
import {
  useMutateExpenseTransaction,
  useMutateIncomeTransaction,
  useMutateTransferTransaction,
} from '../../../api-hooks';
import {Instrument} from '../../../api/models';
import {generateUUID} from '../../../utils';
import {IncomeExpenseTransaction, TransferTransaction} from '../../transactions/EditTransactionScreen';
import {OperationMapping} from './types';

export const useSaveMappings = (
  instruments: Map<number, Instrument>,
  mappings: DeepPartial<OperationMapping>[] | undefined,
) => {
  const instrumentByShortTitle = instruments.mapKeys((_, v) => v.shortTitle);

  const {mutateAsync: mutateIncome, isLoading: isAddingIncomes} = useMutateIncomeTransaction();
  const {mutateAsync: mutateExpense, isLoading: isAddingExpenses} = useMutateExpenseTransaction();
  const {mutateAsync: mutateTransfer, isLoading: isAddingTransfers} = useMutateTransferTransaction();

  const onSavePress = useCallback(async () => {
    if (mappings == null) {
      return;
    }

    const incomeDrafts: IncomeExpenseTransaction[] = [];
    const expenseDrafts: IncomeExpenseTransaction[] = [];
    const transferDrafts: TransferTransaction[] = [];

    for (let i = 0; i < mappings?.length; i++) {
      const mapping = mappings[i];
      const nextMappig = mappings[i + 1];

      switch (mapping.type) {
        case 'income':
        case 'expense':
          const tr: IncomeExpenseTransaction = {
            id: generateUUID(),
            amount: mapping.operation?.accountAmount?.value?.toString(),
            account: {
              title: mapping.accountTitle,
              id: mapping.accountId,
              instrument: instrumentByShortTitle.get(mapping.operation?.accountAmount?.currency?.name)?.id,
            },
            date: new Date(mapping.operation?.operationTime?.milliseconds),
            tag: mapping.tagId ?? null,
            comment: null,
          };
          if (mapping.type === 'income') {
            incomeDrafts.push(tr);
          } else {
            expenseDrafts.push(tr);
          }
          break;
        case 'transferTo':
          if (nextMappig.type !== 'transferFrom') {
            console.warn('Transfer to must be followed by transfer from');
            return;
          }
          transferDrafts.push({
            id: generateUUID(),
            income: mapping.operation?.accountAmount?.value?.toString(),
            incomeAccount: {
              title: mapping.accountTitle,
              id: mapping.accountId,
              instrument: instrumentByShortTitle.get(mapping.operation?.accountAmount?.currency?.name)?.id,
            },
            outcome: nextMappig.operation?.accountAmount?.value?.toString(),
            outcomeAccount: {
              title: nextMappig.accountTitle,
              id: nextMappig.accountId,
              instrument: instrumentByShortTitle.get(nextMappig.operation?.accountAmount?.currency?.name)?.id,
            },
            date: new Date(mapping.operation?.operationTime?.milliseconds),
            comment: null,
          });
          break;
      }

      await Promise.all([mutateIncome(incomeDrafts), mutateExpense(expenseDrafts), mutateTransfer(transferDrafts)]);
    }
  }, [mappings, mutateIncome, mutateExpense, mutateTransfer, instrumentByShortTitle]);

  return {onSavePress, isLoading: isAddingIncomes || isAddingExpenses || isAddingTransfers};
};
