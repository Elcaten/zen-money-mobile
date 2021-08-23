import dayjs from 'dayjs';
import {TagModel, TransactionModel} from '../../api-hooks';

export type FilterFunc = (
  transactions: TransactionModel[],
) => {
  id: string;
  amount: number;
  tag: TagModel | undefined;
  parentTag: TagModel | undefined;
  date: dayjs.Dayjs;
}[];

export type FilterName = 'Income' | 'Expense';

export const filters: Record<FilterName, FilterFunc> = {
  Income: (transactions) =>
    transactions
      .filter((t) => t.income > 0 && t.outcome === 0)
      .map((t) => ({
        id: t.id,
        amount: t.income * t.incomeAccount?.instrumentRate!,
        tag: t.tag,
        parentTag: t.parentTag,
        date: dayjs(t.date),
      })),
  Expense: (transactions) =>
    transactions
      .filter((t) => t.outcome > 0 && t.income === 0)
      .map((t) => ({
        id: t.id,
        amount: t.outcome * t.outcomeAccount?.instrumentRate!,
        tag: t.tag,
        parentTag: t.parentTag,
        date: dayjs(t.date),
      })),
};
