import {useTranslation} from 'react-i18next';
import {useQuery} from 'react-query';
import {useSecureStore} from '../store/use-secure-store';
import {showToast} from '../utils';
import {fetchOperations} from './fetch-operations';

export const useOperations = (start: Date, end: Date) => {
  const username = useSecureStore.use.tinkoffUsername();
  const password = useSecureStore.use.tinkoffPassword();
  const {t} = useTranslation();

  return useQuery(
    ['Operations', start.getTime(), end.getTime()],
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
};
