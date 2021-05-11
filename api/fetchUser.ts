import {fetchEntities} from './fetchEntity';
import {EntityType} from './entyity-type';
import {User} from './models';

export const fetchUser = async (): Promise<User | null> => {
  return fetchEntities<User>(EntityType.User).then((u) => (u.length > 0 ? u[0] : null));
};
