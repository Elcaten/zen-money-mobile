import {useCallback} from 'react';
import {useQuery, useQueryClient} from 'react-query';
import {fetchTags} from '../api/fetchTags';
import {TAGS} from '../auth';

export const useTags = () => {
  const {data, isLoading} = useQuery(TAGS, fetchTags, {staleTime: Infinity});

  const queryClient = useQueryClient();
  const invalidate = useCallback(() => {
    queryClient.invalidateQueries(TAGS);
  }, [queryClient]);

  return {data, isLoading, invalidate};
};
