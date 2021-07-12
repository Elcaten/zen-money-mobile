import {useMutation} from 'react-query';
import {EntityType, postEntity} from '../api';
import {User} from '../api/models';
import {useMe} from './useMe';

export const useMutateMe = () => {
  const {data: me} = useMe();

  return useMutation(({currency}: {currency: number}) => {
    return postEntity<User>(EntityType.User, {
      ...me!,
      changed: new Date().getTime(),
      currency: currency,
    })
      .then(() => ({success: true}))
      .catch(() => ({success: false}));
  });
};
