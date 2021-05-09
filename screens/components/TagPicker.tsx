import * as React from 'react';
import {useMemo} from 'react';
import {Picker, PickerProps as RNPickerProps} from 'react-native';
import {Tag} from '../../api/models';
import {ListItem} from '../../components';
import {TagIcon} from './TagIcon';

export type TagPickerProps = {
  tags: Tag[];
  selectedTag?: string | null;
  onSelect: (id: string) => void;
} & Pick<RNPickerProps, 'enabled'>;

export const TagPicker: React.FC<TagPickerProps> = ({tags, selectedTag, onSelect}) => {
  const selectedTagIcon = useMemo(() => tags.find((t) => t.id === selectedTag)?.icon, [tags, selectedTag]);

  return (
    <ListItem>
      <TagIcon icon={selectedTagIcon} size={24} />
      <Picker onValueChange={onSelect} selectedValue={selectedTag} style={{flex: 1}}>
        {tags.map((t) => (
          <Picker.Item key={t.id} value={t.id} label={t.title} />
        ))}
      </Picker>
    </ListItem>
  );
};
