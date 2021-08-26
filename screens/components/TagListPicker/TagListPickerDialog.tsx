import React, {useCallback} from 'react';
import {ListRenderItemInfo} from 'react-native';
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
  const onPress = useCallback(
    (tag: Tag) => {
      props.onSelect(tag);
      props.onRequestClose();
    },
    [props],
  );

  const renderItem = useCallback(
    (info: ListRenderItemInfo<Tag>) => (
      <TagListItem
        tag={info.item}
        rightIcon={() => (props.value === info.item.id ? <CheckIcon /> : null)}
        onPress={onPress}
      />
    ),
    [onPress, props.value],
  );

  return (
    <ZenOverlay isVisible={props.visible} animationType="slide" fullScreen={true} onRequestClose={props.onRequestClose}>
      <TagList renderItem={renderItem} />
    </ZenOverlay>
  );
};
