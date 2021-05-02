import {EntityType, fetchEntities} from './fetchEntity';
import {Transaction} from './models';

export const fetchTransactions = async () => {
  return fetchEntities<Transaction>(EntityType.Transaction);
};
