import {EntityType} from './entyity-type';
import {fetchEntities} from './fetchEntity';
import {User} from './models';

export const fetchUsers = async () => {
  return fetchEntities<User>(EntityType.User);
};
