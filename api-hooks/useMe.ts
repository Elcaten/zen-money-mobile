import {useMutation, useQuery} from 'react-query';
import {EntityType, fetchUser, postEntity} from '../api';
import {User} from '../api/models';
import {QueryKeys} from './query-keys';

export const useMe = () =>
  useQuery(
    QueryKeys.Users,
    () => fetchUser(),
    {staleTime: 1000 * 60 * 60}, // DONT FUCKING ADD Infinity,
  );

export const useMutateMe = () => {
  const {data: me} = useMe();

  return useMutation(({currency}: {currency: number}) => {
    return postEntity<User>(EntityType.User, {
      ...me!,
      changed: new Date().getTime(),
      currency: currency,
    });
  });
};
