import React, {useCallback} from 'react';
import {Tag} from '../../../api/models';
import {ListItem} from '../../../components/ListItem';
import {ZenText} from '../../../components/ZenText';
import {TagIcon} from '../TagIcon';

export interface TagListItemProps {
  tag: Tag;
  onPress: (tag: Tag) => void;
  rightIcon?: () => React.ReactNode;
}

export const TagListItem: React.FC<TagListItemProps> = ({tag, onPress, rightIcon}) => {
  const onPressCb = useCallback(() => {
    onPress(tag);
  }, [onPress, tag]);

  return (
    <ListItem onPress={onPressCb} topDivider={!tag.parent}>
      <TagIcon style={{marginLeft: tag.parent ? 32 : 0}} icon={tag.icon} color={tag.color} />
      <ZenText>{tag.title}</ZenText>
      {rightIcon && rightIcon()}
    </ListItem>
  );
};
