import {useQuery} from 'react-query';
import {fetchUser} from '../api';
import {QueryKeys} from './query-keys';

export const useMe = () =>
  useQuery(
    QueryKeys.Users,
    () => fetchUser(),
    {staleTime: 1000 * 60 * 60}, // DONT FUCKING ADD Infinity,
  );
