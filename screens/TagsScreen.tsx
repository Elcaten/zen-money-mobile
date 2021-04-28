import * as React from 'react';
import {useCallback, useMemo} from 'react';
import {FlatList, ListRenderItemInfo, StyleSheet, TouchableOpacity} from 'react-native';
import {useTags} from '../api-hooks/useTags';
import {Tag} from '../api/fetchTags';
import {Text} from '../components';
import {ListItem} from '../components/ListItem';
import {TagsScreenProps} from '../types';
import {extractId, flatten, groupBy} from '../utils';
import {TagIcon} from './components';

interface TagItemProps {
  tag: Tag;
  onPress: (tag: Tag) => void;
}

const TagItem: React.FC<TagItemProps> = ({tag, onPress}) => {
  const onPressCb = useCallback(() => {
    onPress(tag);
  }, [onPress, tag]);
  return (
    <ListItem onPress={onPressCb} topDivider={!tag.parent}>
      <TagIcon style={[{marginLeft: tag.parent ? 32 : 0}]} icon={tag.icon} color={tag.color} size={24} />
      <Text style={{fontSize: 18}}>{tag.title}</Text>
    </ListItem>
  );
};

export const TagsScreen: React.FC<TagsScreenProps> = ({navigation}) => {
  const {data, isLoading, invalidate} = useTags();

  const tagItems = useMemo<Tag[]>(() => {
    const tagsArray = data?.values ? Array.from(data.values()) : [];
    const tagsByParent = groupBy(tagsArray, 'parent');
    const rootTags = (tagsByParent.get(undefined) ?? []).sort((t1, t2) => t1.title.localeCompare(t2.title));
    return flatten(rootTags.map((t) => [t, ...(tagsByParent.get(t.id) ?? [])]));
  }, [data]);

  const opendDetails = useCallback(
    (tag: Tag) => {
      navigation.navigate('TagDetailsScreen', {tagId: tag.id});
    },
    [navigation],
  );
  const renderTag = React.useCallback(
    (info: ListRenderItemInfo<Tag>) => <TagItem tag={info.item} onPress={opendDetails} />,
    [opendDetails],
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
