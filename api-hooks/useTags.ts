import {useCallback} from 'react';
import {useMutation, useQuery, useQueryClient} from 'react-query';
import {EntityType, postEntity} from '../api';
import {deleteEntity} from '../api/deleteEntity';
import {fetchTags} from '../api/fetchTags';
import {Tag} from '../api/models';
import {EditableTag} from '../screens/more';
import {QueryKeys} from './query-keys';
import {useMe} from './useMe';

const EMPTY_MAP = new Map<string, Tag>();

export const useTags = () => {
  const {data, isLoading} = useQuery(
    QueryKeys.Tags,
    () => fetchTags().then((tags) => new Map(tags?.map((t) => [t.id, t]))),
    {staleTime: Infinity},
  );

  const queryClient = useQueryClient();
  const invalidate = useCallback(() => {
    queryClient.invalidateQueries(QueryKeys.Tags);
  }, [queryClient]);

  return {data: data ?? EMPTY_MAP, isLoading, invalidate};
};

export const useMutateTag = () => {
  const user = useMe();
  return useMutation((editableTag: EditableTag) => {
    const tag: Tag = {
      ...editableTag,
      parent: editableTag.parent ?? null,
      changed: new Date().getTime(),
      budgetIncome: false,
      budgetOutcome: false,
      user: user.data!.id,
    };
    return postEntity<Tag>(EntityType.Tag, tag);
  });
};

export const useDeleteTag = () => {
  const user = useMe();
  return useMutation((tagId: string) => deleteEntity(user.data!.id, EntityType.Tag, tagId));
};
