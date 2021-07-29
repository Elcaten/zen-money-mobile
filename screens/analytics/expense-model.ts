export interface ExpenseModel {
  id: string;
  tagId: string | undefined;
  title: string | null | undefined;
  amount: number;
  amountFormatted: string;
  color: string;
}
