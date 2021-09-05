import React from 'react';
import {useSortedByParentTags} from '../../../api-hooks';
import {Tag} from '../../../api/models';
import {CheckIcon} from '../../../components';
import {ZenOverlay} from '../../../components/ZenOverlay';
import {TagListItem} from '../TagList';
import {TagList} from '../TagList/TagList';

export interface TagListPickerDialogProps {
  visible: boolean;
  onRequestClose: () => void;
  value: string | undefined;
  onSelect: (tag: Tag) => void;
}

export const TagListPickerDialog: React.FC<TagListPickerDialogProps> = (props) => {
  const {tags} = useSortedByParentTags();

  const renderItem = (tag: Tag) => (
    <TagListItem
      tag={tag}
      rightIcon={() => (props.value === tag.id ? <CheckIcon /> : null)}
      onPress={(t: Tag) => {
        props.onSelect(t);
        props.onRequestClose();
      }}
    />
  );

  return (
    <ZenOverlay isVisible={props.visible} animationType="slide" fullScreen={true} onRequestClose={props.onRequestClose}>
      <TagList tags={tags} renderItem={renderItem} />
    </ZenOverlay>
  );
};
