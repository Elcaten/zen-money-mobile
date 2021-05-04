import {useMutation} from 'react-query';
import {EntityType} from '../api/entyity-type';
import {Transaction} from '../api/models';
import {postEntity} from '../api/postEntity';

export const useAddTransaction = () => {
  return useMutation((transaction: Transaction) => postEntity(EntityType.Transaction, transaction));
};
