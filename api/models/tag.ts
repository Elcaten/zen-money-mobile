import {TagIconName} from './tag-icon-name';

export interface Tag {
  id: string; // UUID
  changed: number; // Unix timestamp
  user: number; // User.id

  title: string;
  parent?: string | null; // Tag.id
  icon?: TagIconName | null;
  picture?: string | null;
  color?: number | null;

  showIncome: boolean;
  showOutcome: boolean;
  budgetIncome: boolean;
  budgetOutcome: boolean;
  required?: boolean | null;
}
