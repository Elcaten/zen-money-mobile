import {EntityType, fetchEntities} from './fetchEntity';

export const fetchTags = async () => {
  return fetchEntities<Tag>(EntityType.Tag).then((tags) => new Map(tags?.map((t) => [t.id, t])));
};

export interface Tag {
  id: string; // UUID
  changed: number; // Unix timestamp
  user: number; // User.id

  title: string;
  parent?: string | null; // Tag.id
  icon?: string | null;
  picture?: string | null;
  color?: number | null;

  showIncome: boolean;
  showOutcome: boolean;
  budgetIncome: boolean;
  budgetOutcome: boolean;
  required?: boolean | null;
}
