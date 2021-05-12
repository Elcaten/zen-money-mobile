import {EntityType} from './entyity-type';
import {fetchEntities} from './fetchEntity';
import {UserAccount} from './models';

export const fetchAccounts = async () => {
  return fetchEntities<UserAccount>(EntityType.Account);
};
