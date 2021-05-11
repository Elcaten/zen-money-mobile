import {useQuery} from 'react-query';
import {fetchUser} from '../api';
import {USERS} from '../auth/constants';

export const useMe = () =>
  useQuery(
    USERS,
    () => fetchUser(),
    {staleTime: 0}, // DONT FUCKING ADD Infinity,
  );
