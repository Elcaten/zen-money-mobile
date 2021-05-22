import {Picker} from '@react-native-picker/picker';
import * as React from 'react';
import {Tag} from '../../api/models';
import {View} from '../../components';

export type TagPickerProps = {
  tags: Tag[];
  selectedTag?: string | null;
  onSelect: (id: string) => void;
};

export const TagPicker: React.FC<TagPickerProps> = ({tags, selectedTag, onSelect}) => {
  const selectedTagTitle = tags.find((t) => t.id === selectedTag)?.title;

  return (
    <View style={{flexDirection: 'row'}}>
      <Picker onValueChange={onSelect} selectedValue={selectedTag ?? undefined} style={{flex: 1, color: '#000000'}}>
        {tags.map((t) => (
          <Picker.Item key={t.id} value={t.id} label={t.title} />
        ))}
      </Picker>
    </View>
  );
};
