import React from 'react';
import {useQuery, useQueryClient, UseQueryOptions} from 'react-query';
import {FirebaseApi as firebaseApi} from './firebase-api';

export function useFirebaseQuery<TData>(firebasePathKey: string, useQueryOptions: UseQueryOptions<TData, Error> = {}) {
  const queryClient = useQueryClient();

  React.useEffect(() => {
    const unsubscribe = firebaseApi.subscribe<TData>({
      path: firebasePathKey,
      callback: (val) => {
        queryClient.setQueryData(firebasePathKey, val);
      },
    });

    return () => unsubscribe();
  }, [queryClient, firebasePathKey]);

  return useQuery<TData, Error>(
    firebasePathKey,
    () => new Promise<TData>(() => {}),
    useQueryOptions,
  );
}
