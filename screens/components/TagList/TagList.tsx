import React, {useMemo} from 'react';
import {FlatList, ListRenderItemInfo} from 'react-native';
import {useTags} from '../../../api-hooks';
import {Tag} from '../../../api/models';
import {extractId} from '../../../utils';
import {TagListItem} from './TagListItem';

export interface TagListProps {
  onPress: (tag: Tag) => void;
}

export const TagList: React.FC<TagListProps> = ({onPress}) => {
  const {data, isLoading, invalidate} = useTags();

  const tagItems = useMemo<Tag[]>(() => {
    const tagsArray = data?.values ? Array.from(data.values()) : [];
    const tagsByParent = tagsArray.groupBy('parent');
    const rootTags = tagsArray.filter((t) => t.parent == null).sort((t1, t2) => t1.title.localeCompare(t2.title));
    return rootTags.map((t) => [t, ...(tagsByParent.get(t.id) ?? [])]).flatten();
  }, [data]);

  const renderTag = React.useCallback(
    (info: ListRenderItemInfo<Tag>) => <TagListItem tag={info.item} onPress={onPress} />,
    [onPress],
  );

  return (
    <FlatList
      data={tagItems}
      onRefresh={invalidate}
      refreshing={isLoading}
      keyExtractor={extractId}
      renderItem={renderTag}
    />
  );
};
