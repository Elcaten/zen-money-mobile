import {useEffect, useMemo, useState} from 'react';
import {AccountModel} from '../../../api-hooks';
import {Tag} from '../../../api/models';
import {OperationsCommand} from '../../../lib/tinkoff-api/commands';
import {useStore} from '../../../store/use-store';
import {OperationMapping} from './types';

type Operation = OperationsCommand.IOperation;

export const useOperationMappings = (
  operations: Operation[] | undefined,
  tags: Map<string, Tag>,
  accounts: AccountModel[],
) => {
  const [mappings, setMappings] = useState<OperationMapping[]>([]);

  const _cardInfo = useStore.use.cardInfo();
  const cardInfo = useMemo(() => new Map(_cardInfo.map((c) => [c.cardNumber, c])), [_cardInfo]);
  const excludedCards = useMemo(
    () => new Set(_cardInfo.filter((c) => c.excludeFromSync).map((c) => c.cardNumber)),
    [_cardInfo],
  );

  const _categoryInfo = useStore.use.categoryInfo();
  const categoryInfo = useMemo(() => new Map(_categoryInfo.map((c) => [c.categoryId, c])), [_categoryInfo]);

  useEffect(() => {
    if (operations == null) {
      return;
    }

    const validOperations = operations.filter(
      (o) =>
        o.status === OperationsCommand.OperationStatus.OK && (o.cardNumber == null || !excludedCards.has(o.cardNumber)),
    );

    const newMappings: OperationMapping[] = [];
    for (let i = 0; i < validOperations.length; i++) {
      const operation = validOperations[i];
      const nextOperation = validOperations[i + 1];
      const prevOperation = validOperations[i - 1];

      let type: 'income' | 'expense' | 'transferFrom' | 'transferTo' | undefined;
      if (
        (isBrokerWithdrawal(operation) && isTransferFrom(nextOperation)) ||
        (isTransferTo(operation) &&
          isTransferFrom(nextOperation) &&
          operation.amount.value === nextOperation.amount.value)
      ) {
        type = 'transferTo';
      } else if (
        isTransferFrom(operation) &&
        (isBrokerWithdrawal(prevOperation) ||
          (isTransferTo(prevOperation) && operation.amount.value === prevOperation.amount.value))
      ) {
        type = 'transferFrom';
      } else if (operation.type === 'Debit') {
        type = 'expense';
      } else if (operation.type === 'Credit') {
        type = 'income';
      }

      newMappings.push({
        operation,
        tagId: categoryInfo.tryGet(operation.category.id, undefined)?.tagId,
        accountId: cardInfo.tryGet(operation.cardNumber ?? operation.payment?.cardNumber, undefined)?.accountId,
        accountTitle: cardInfo.tryGet(operation.cardNumber ?? operation.payment?.cardNumber, undefined)?.accountTitle,
        type: type,
      });
    }

    setMappings(newMappings);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accounts, operations, tags]);

  return mappings;
};

const isTransferTo = (o?: Operation) => {
  const isInternalTransferTo = o?.category?.name === 'Другое' && o?.subcategory === 'Перевод между счетами';
  const isExternalTransferTo =
    (o?.category?.name === 'Финан. услуги' || o?.category?.name === 'Другое') && o?.subcategory === 'Перевод с карты';
  return isExternalTransferTo || isInternalTransferTo;
};

const isTransferFrom = (o?: Operation) => {
  const isInternalTransferFrom = o?.category?.name === 'Переводы/иб' && o?.subcategory === 'Перевод между счетами';
  const isExternalTransferFrom = o?.category?.name === 'Переводы' && o?.subcategory === 'Перевод с карты';
  return isExternalTransferFrom || isInternalTransferFrom;
};

const isBrokerWithdrawal = (o?: Operation) => o?.subcategory === 'Вывод с брокерского счета';
