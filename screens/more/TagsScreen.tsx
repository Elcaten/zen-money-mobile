import * as React from 'react';
import {useCallback, useMemo} from 'react';
import {FlatList, ListRenderItemInfo} from 'react-native';
import {useTags} from '../../api-hooks/useTags';
import {Tag} from '../../api/models';
import {ListItem} from '../../components/ListItem';
import {ZenText} from '../../components/ZenText';
import {useHeaderButtons} from '../../hooks/useHeaderButtons';
import {TagsScreenProps} from '../../types';
import {extractId} from '../../utils';
import {TagIcon} from '../components';

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
      <TagIcon style={[{marginLeft: tag.parent ? 32 : 0}]} icon={tag.icon} color={tag.color} />
      <ZenText>{tag.title}</ZenText>
    </ListItem>
  );
};

export const TagsScreen: React.FC<TagsScreenProps> = ({navigation}) => {
  const {data, isLoading, invalidate} = useTags();

  const tagItems = useMemo<Tag[]>(() => {
    const tagsArray = data?.values ? Array.from(data.values()) : [];
    const tagsByParent = tagsArray.groupBy('parent');
    const rootTags = tagsArray.filter((t) => t.parent == null).sort((t1, t2) => t1.title.localeCompare(t2.title));
    return rootTags.map((t) => [t, ...(tagsByParent.get(t.id) ?? [])]).flatten();
  }, [data]);

  const opendDetails = useCallback((tag: Tag) => navigation.navigate('TagDetailsScreen', {tagId: tag.id}), [
    navigation,
  ]);

  const onAddPress = useCallback(() => navigation.navigate('TagDetailsScreen', {tagId: undefined}), [navigation]);

  const renderTag = React.useCallback(
    (info: ListRenderItemInfo<Tag>) => <TagItem tag={info.item} onPress={opendDetails} />,
    [opendDetails],
  );

  useHeaderButtons(navigation, {onAddPress});

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
