import {EntityType, fetchEntitiesSinceDate} from './fetchEntity';
import {Transaction} from './models';

export const fetchTransactions = async () => {
  return fetchEntitiesSinceDate<Transaction>(EntityType.Transaction, new Date(2021, 3, 16));
};
