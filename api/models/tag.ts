import {TagIconName} from './tag-icon-name';

export interface Tag {
  /** UUID */
  id: string;
  /** Unix timestamp */
  changed: number;
  /** User.id */
  user: number;

  title: string;
  /** Tag.id */
  parent?: string | null;
  icon?: TagIconName | null;
  picture?: string | null;
  color?: number | null;

  showIncome: boolean;
  showOutcome: boolean;
  budgetIncome: boolean;
  budgetOutcome: boolean;
  /** if null, then still required */
  required?: boolean | null;
}
