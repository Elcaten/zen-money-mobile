import React, {useCallback} from 'react';
import {StyleProp, ImageStyle, TextStyle, StyleSheet} from 'react-native';
import {Tag} from '../../../api/models';
import {ListItem} from '../../../components/ListItem';
import {ZenText} from '../../../components/ZenText';
import {TagIcon} from '../TagIcon';

interface TagListItemProps {
  tag: Tag;
  onPress: (tag: Tag) => void;
  iconsStyle?: StyleProp<ImageStyle> & StyleProp<TextStyle>;
  rightIcon?: () => React.ReactNode;
}

export const TagListItem: React.FC<TagListItemProps> = ({tag, onPress, iconsStyle, rightIcon}) => {
  const onPressCb = useCallback(() => {
    onPress(tag);
  }, [onPress, tag]);
  return (
    <ListItem style={styles.wrapper} onPress={onPressCb} topDivider={!tag.parent}>
      <TagIcon style={iconsStyle} icon={tag.icon} color={tag.color} />
      <ZenText>{tag.title}</ZenText>
      {rightIcon && rightIcon()}
    </ListItem>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
  },
});
