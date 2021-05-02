import {EntityType, fetchEntitiesUncached} from './fetchEntity';
import {Account} from './models';

export const fetchAccounts = async () => {
  return fetchEntitiesUncached<Account>(EntityType.Account);
};
