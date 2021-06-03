import {Picker} from '@react-native-picker/picker';
import * as React from 'react';
import {useMemo} from 'react';
import {Icon} from 'react-native-elements';
import {Tag} from '../../api/models';
import {View} from '../../components';

export type TagPickerProps = {
  tags: Tag[];
  selectedTag?: string | null;
  onSelect: (id?: string) => void;
};

export const TagPicker: React.FC<TagPickerProps> = ({tags, selectedTag, onSelect}) => {
  // const selectedTagTitle = tags.find((t) => t.id === selectedTag)?.title;

  const options = useMemo<Tag[]>(() => {
    return [{id: undefined, title: 'Select a category'}, ...tags];
  }, [tags]);

  return (
    <View style={{flexDirection: 'row'}}>
      <Picker onValueChange={onSelect} selectedValue={selectedTag ?? undefined} style={{flex: 1, color: '#000000'}}>
        {options.map(({id, title}) => (
          <Picker.Item key={title} value={id} label={title} />
        ))}
      </Picker>
      <Icon name="clear" onPress={() => onSelect(undefined)} />
    </View>
  );
};
