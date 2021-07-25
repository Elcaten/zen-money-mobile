import {Picker} from '@react-native-picker/picker';
import * as React from 'react';
import {useMemo} from 'react';
import {StyleSheet} from 'react-native';
import {Icon} from 'react-native-elements';
import {Tag} from '../../api/models';
import {View} from '../../components';
import {useNavigatorThemeColors} from '../../themes';

export type TagPickerProps = {
  tags: Tag[];
  selectedTag?: string | null;
  onSelect: (id?: string) => void;
};

export const TagPicker: React.FC<TagPickerProps> = ({tags, selectedTag, onSelect}) => {
  const options = useMemo<{title: string; id?: string}[]>(() => {
    return [{id: undefined, title: 'Select a category'}, ...tags];
  }, [tags]);

  const {text} = useNavigatorThemeColors();

  return (
    <View style={styles.wrapper}>
      <Picker onValueChange={onSelect} selectedValue={selectedTag ?? undefined} style={[styles.picker, {color: text}]}>
        {options.map(({id, title}) => (
          <Picker.Item key={title} value={id} label={title} />
        ))}
      </Picker>
      <Icon name="clear" onPress={() => onSelect(undefined)} />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
  },
  picker: {
    flex: 1,
  },
});
