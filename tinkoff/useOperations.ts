import {useCallback, useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import {useQuery, useQueryClient} from 'react-query';
import {useStore} from '../store/use-store';
import {getDayEnd, getDayStart, showToast} from '../utils';
import {fetchOperations} from './fetch-operations';

export const useOperations = (_start: Date, _end: Date) => {
  const start = getDayStart(_start);
  const end = getDayEnd(_end);
  const queryKeys = useMemo(() => ['Operations', start.getTime(), end.getTime()], [end, start]);
  const username = useStore.use.tinkoffUsername();
  const password = useStore.use.tinkoffPassword();
  const {t} = useTranslation();
  const queryClient = useQueryClient();
  const invalidate = useCallback(() => queryClient.invalidateQueries(queryKeys), [queryClient, queryKeys]);
  const query = useQuery(
    queryKeys,
    () => {
      if (username == null || password == null) {
        showToast(t('FetchOperations.INVALID_PASSWORD'));
        return [];
      }
      return fetchOperations(username, password, start, end);
    },
    {
      staleTime: Infinity,
      retry: false,
      cacheTime: 60 * 60 * 1000,
    },
  );

  return useMemo(
    () => ({
      data: query.data,
      isLoading: query.isLoading,
      invalidate,
    }),
    [invalidate, query.data, query.isLoading],
  );
};
