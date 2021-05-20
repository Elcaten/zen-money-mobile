import {useQuery} from 'react-query';
import {fetchUser} from '../api';
import {QueryKeys} from './query-keys';

export const useMe = () =>
  useQuery(
    QueryKeys.Users,
    () => fetchUser(),
    {staleTime: 0}, // DONT FUCKING ADD Infinity,
  );
