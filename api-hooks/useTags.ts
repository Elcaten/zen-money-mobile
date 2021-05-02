import {useCallback, useMemo} from 'react';
import {useQuery, useQueryClient} from 'react-query';
import {fetchTags} from '../api/fetchTags';
import {TAGS} from '../auth';

export const useTags = () => {
  const {data, isLoading} = useQuery(TAGS, fetchTags, {staleTime: Infinity});

  const tags = useMemo(() => {
    return new Map(data?.map((t) => [t.id, t]));
  }, [data]);

  const queryClient = useQueryClient();
  const invalidate = useCallback(() => {
    queryClient.invalidateQueries(TAGS);
  }, [queryClient]);

  return {data: tags, isLoading, invalidate};
};
