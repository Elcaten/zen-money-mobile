import {EntityType} from './entyity-type';
import {fetchEntities} from './fetchEntity';
import {Transaction} from './models';

export const fetchTransactions = async () => {
  return fetchEntities<Transaction>(EntityType.Transaction);
};
