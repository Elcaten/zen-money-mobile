import {useQuery} from 'react-query';
import {fetchUsers} from '../api';
import {USERS} from '../auth/constants';

export const useMe = () =>
  useQuery(
    USERS,
    () =>
      fetchUsers()
        .then((u) => {
          return u ? u[0] : null;
        })
        .catch((err) => {
          console.error(err);
          return null;
        }),
    {staleTime: Infinity},
  );
