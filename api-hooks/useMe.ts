import {useQuery} from 'react-query';
import {fetchUsers} from '../api';
import {USERS} from '../auth/constants';

export const useMe = () =>
  useQuery(
    USERS,
    () =>
      fetchUsers()
        .then((u) => (u ? u[0] : null))
        .catch(() => null),
    {
      retry: 0,
      // should be refetched in the background every 8 hours
      staleTime: 1000 * 60 * 60 * 8,
    },
  );
