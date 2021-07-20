import {useMutation} from 'react-query';
import {EntityType, postEntity} from '../api';
import {deleteEntity} from '../api/deleteEntity';
import {UserAccount} from '../api/models';
import {EditableAccount} from '../screens/account/EditAccountScreen/editable-account';
import {useMe} from './useMe';

export const useMutateAccount = () => {
  const user = useMe();

  return useMutation((account: EditableAccount) => {
    const now = new Date();

    return postEntity<UserAccount>(EntityType.Account, {
      changed: now.getTime(),
      private: false,
      user: user.data!.id,
      id: account.id,
      title: account.title,
      type: account.type,
      balance: account.balance,
      startBalance: account.startBalance,
      archive: account.archive,
      instrument: account.instrument,
      inBalance: account.inBalance,
      savings: account.savings,
      creditLimit: account.creditLimit,

      role: null,
      company: null,
      syncID: null,
      enableCorrection: false,
      enableSMS: false,
      capitalization: null,
      percent: null,
      startDate: null,
      endDateOffset: null,
      endDateOffsetInterval: null,
      payoffStep: null,
      payoffInterval: null,
    });
  });
};

export const useDeleteAccount = () => {
  const user = useMe();
  const {isLoading, mutateAsync} = useMutation((accountId: string) =>
    deleteEntity(user.data!.id, EntityType.Account, accountId),
  );
  return {isDeleting: isLoading, deleteAsync: mutateAsync};
};
