export enum TransactionType {
  Expense = 'Expense',
  Income = 'Income',
  Transfer = 'Transfer',
}

export type IncomeExpenseTransaction = TransactionType.Income | TransactionType.Expense;
