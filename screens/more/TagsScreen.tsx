import * as React from 'react';
import {useCallback} from 'react';
import {ListRenderItemInfo} from 'react-native';
import {Tag} from '../../api/models';
import {useHeaderButtons} from '../../hooks/useHeaderButtons';
import {TagsScreenProps} from '../../types';
import {TagList, TagListItem} from '../components/TagList';

export const TagsScreen: React.FC<TagsScreenProps> = ({navigation}) => {
  const onAddPress = useCallback(() => navigation.navigate('TagDetailsScreen', {tagId: undefined}), [navigation]);

  useHeaderButtons(navigation, {onAddPress});

  const renderItem = useCallback(
    (info: ListRenderItemInfo<Tag>) => (
      <TagListItem tag={info.item} onPress={(tag: Tag) => navigation.navigate('TagDetailsScreen', {tagId: tag.id})} />
    ),
    [navigation],
  );

  return <TagList renderItem={renderItem} />;
};
