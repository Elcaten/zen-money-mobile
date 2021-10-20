import React, {useCallback} from 'react';
import {StyleProp, ImageStyle, TextStyle} from 'react-native';
import {Tag} from '../../../api/models';
import {ListItem} from '../../../components/ListItem';
import {ZenText} from '../../../components/ZenText';
import {TagIcon} from '../TagIcon';

interface TagListItemProps {
  tag: Tag;
  onPress: (tag: Tag) => void;
  iconsStyle?: StyleProp<ImageStyle> & StyleProp<TextStyle>;
}

export const TagListItem: React.FC<TagListItemProps> = ({tag, onPress, iconsStyle}) => {
  const onPressCb = useCallback(() => {
    onPress(tag);
  }, [onPress, tag]);
  return (
    <ListItem onPress={onPressCb} topDivider={!tag.parent}>
      <TagIcon style={iconsStyle} icon={tag.icon} color={tag.color} />
      <ZenText>{tag.title}</ZenText>
    </ListItem>
  );
};
