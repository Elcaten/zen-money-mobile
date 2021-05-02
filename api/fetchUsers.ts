import {EntityType, fetchEntitiesUncached} from './fetchEntity';
import {User} from './models';

export const fetchUsers = async () => {
  return fetchEntitiesUncached<User>(EntityType.User);
};
