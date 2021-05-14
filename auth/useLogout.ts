import AsyncStorage from '@react-native-async-storage/async-storage';
import {useCallback} from 'react';
import {useQueryClient} from 'react-query';
import {persistToken} from './persist-token';

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useCallback(async () => {
    persistToken(null);
    await queryClient.invalidateQueries({refetchActive: true, refetchInactive: true});
    await AsyncStorage.clear();
    console.log('Refetched on logout');
  }, [queryClient]);
};
