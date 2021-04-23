import * as React from 'react';
import {useMemo} from 'react';
import {useTags} from '../api-hooks/useTags';
import {Text, View} from '../components/Themed';
import {TagDetailsScreenProps} from '../types';

export const TagDetailsScreen: React.FC<TagDetailsScreenProps> = ({navigation, route}) => {
  const tags = useTags();
  const tag = useMemo(() => tags.data?.get(route.params.tagId), [route.params.tagId, tags.data]);

  if (!tag) {
    return null;
  }

  return (
    <View>
      <Text>{tag.title}</Text>
      <Text>{tag.parent}</Text>
      <Text>{tag.icon}</Text>
    </View>
  );
};
