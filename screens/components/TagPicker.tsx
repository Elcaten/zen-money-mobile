import * as React from 'react';
import {useCallback} from 'react';
import {Picker, PickerProps as RNPickerProps} from 'react-native';
import {Tag} from '../../api/models';
import {ListItem, TagIcon} from '../../components';

export type TagPickerProps = {
  tags: Tag[];
  selectedTag: Tag | null;
  onSelect: (tag: Tag) => void;
} & Pick<RNPickerProps, 'enabled'>;

export const TagPicker: React.FC<TagPickerProps> = ({tags, selectedTag, onSelect: _onSelect}) => {
  const onSelect = useCallback(
    (id: string) => {
      _onSelect(tags.find((t) => t.id === id)!);
    },
    [_onSelect, tags],
  );

  return (
    <ListItem>
      <TagIcon size={24} />
      <Picker onValueChange={onSelect} selectedValue={selectedTag?.id} style={{flex: 1}}>
        {tags.map((t) => (
          <Picker.Item key={t.id} value={t.id} label={t.title} />
        ))}
      </Picker>
    </ListItem>
  );
};
