import * as React from 'react';
import {useCallback} from 'react';
import {useSortedByParentTags} from '../../api-hooks';
import {Tag} from '../../api/models';
import {useHeaderButtons} from '../../hooks/useHeaderButtons';
import {TagsScreenProps} from '../../types';
import {TagList} from '../components/TagList';
import {TagListItem} from '../components/TagListItem';

export const TagsScreen: React.FC<TagsScreenProps> = ({navigation}) => {
  const {tags} = useSortedByParentTags();

  const onAddPress = useCallback(() => navigation.navigate('TagDetailsScreen', {tagId: undefined}), [navigation]);

  useHeaderButtons(navigation, {onAddPress});

  const renderItem = useCallback(
    (tag: Tag) => (
      <TagListItem
        iconsStyle={{marginLeft: tag.parent ? 32 : 0}}
        tag={tag}
        onPress={(t) => navigation.navigate('TagDetailsScreen', {tagId: t.id})}
      />
    ),
    [navigation],
  );

  return <TagList tags={tags} renderItem={renderItem} />;
};
