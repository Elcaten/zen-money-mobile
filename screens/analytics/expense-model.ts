import {TagIconName} from '../../api/models';

export interface ExpenseModel {
  id: string;
  amount: number;
  amountFormatted: string;
  tag?: string | null;
  tagIcon?: TagIconName | null;
  color: string;
}
