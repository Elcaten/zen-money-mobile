import * as React from 'react';
import {useCallback} from 'react';
import {Tag} from '../../api/models';
import {useHeaderButtons} from '../../hooks/useHeaderButtons';
import {TagsScreenProps} from '../../types';
import {TagList} from '../components/TagList';

export const TagsScreen: React.FC<TagsScreenProps> = ({navigation}) => {
  const opendDetails = useCallback((tag: Tag) => navigation.navigate('TagDetailsScreen', {tagId: tag.id}), [
    navigation,
  ]);

  const onAddPress = useCallback(() => navigation.navigate('TagDetailsScreen', {tagId: undefined}), [navigation]);

  useHeaderButtons(navigation, {onAddPress});

  return <TagList onPress={opendDetails} />;
};
