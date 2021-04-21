import {EntityType, fetchEntities} from './fetchEntity';

export const fetchUsers = async () => {
  return fetchEntities<User>(EntityType.User);
};

export interface User {
  id: number;
  changed: number; // Unix timestamp
  login?: string;
  currency: number; // Instrument id
  parent?: number; // User id
}
