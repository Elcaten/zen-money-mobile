import {EntityType, fetchEntities, fetchEntitiesUncached} from './fetchEntity';
import {Account} from './models';

export const fetchAccounts = async () => {
  return fetchEntities<Account>(EntityType.Account);
};
