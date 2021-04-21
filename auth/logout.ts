import {QueryClient} from 'react-query';
import {USERS} from './constants';
import {persistToken} from './persist-token';

export const logout = () => {
  persistToken(null);
  new QueryClient().invalidateQueries(USERS);
};
