import * as React from 'react';
import {ForwardRefRenderFunction, useImperativeHandle, useRef} from 'react';
import {Control, Controller} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {StyleSheet, ViewProps} from 'react-native';
import {CheckBox, InputHandles} from 'react-native-elements';
import {Tag} from '../../api/models';
import {Input, ListItem, Text, View} from '../../components';
import {IconPicker} from './IconPicker';
import {RadioButton} from './RadioButton';
import {TagPicker} from './TagPicker';

export type EditableTag = Pick<Tag, 'title' | 'parent' | 'icon' | 'showIncome' | 'showOutcome' | 'required' | 'id'>;

export interface TagEditorHandles {
  shakeTitle: () => void;
}

export type TagEditorProps = {
  parentTags: Tag[];
  control: Control<EditableTag>;
} & ViewProps;

const TagEditorComponent: ForwardRefRenderFunction<TagEditorHandles, TagEditorProps> = (
  {parentTags, control, ...rest},
  ref,
) => {
  const {t} = useTranslation();

  const inputRef = useRef<InputHandles>(null);
  useImperativeHandle(ref, () => ({
    shakeTitle: () => inputRef.current?.shake(),
  }));

  return (
    <View {...rest}>
      <Controller
        control={control}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            ref={inputRef}
            placeholder={t('Components.TagEditor.Title')}
            value={value}
            onBlur={onBlur}
            onChangeText={(text) => onChange(text)}
          />
        )}
        name="title"
        rules={{required: true}}
      />

      <Controller
        control={control}
        render={({field: {onChange, value}}) => {
          const parent = parentTags.find(({id}) => id === value) ?? null;
          return parentTags.length > 0 ? (
            <TagPicker tags={parentTags} selectedTag={parent} onSelect={(tag) => onChange(tag.id)} />
          ) : (
            <></>
          );
        }}
        name="parent"
      />

      <IconPicker />

      <View style={styles.show}>
        <Controller
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <CheckBox
              title={t('Components.TagEditor.Expense')}
              checked={value}
              onBlur={onBlur}
              onPress={() => onChange(!value)}
            />
          )}
          name="showOutcome"
        />
        <Controller
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <CheckBox
              title={t('Components.TagEditor.Income')}
              checked={value}
              onBlur={onBlur}
              onPress={() => onChange(!value)}
            />
          )}
          name="showIncome"
        />
      </View>

      <Controller
        control={control}
        render={({field: {onChange, value}}) => (
          <React.Fragment>
            <Text>{t('Components.TagEditor.SpendingTitle')}</Text>
            <ListItem onPress={() => onChange(true)}>
              <RadioButton checked={!!value} />
              <ListItem.Content>
                <ListItem.Title>{t('Components.TagEditor.Fixed')}</ListItem.Title>
              </ListItem.Content>
            </ListItem>
            <ListItem onPress={() => onChange(false)}>
              <RadioButton checked={!value} />
              <ListItem.Content>
                <ListItem.Title>{t('Components.TagEditor.Flexible')}</ListItem.Title>
              </ListItem.Content>
            </ListItem>
          </React.Fragment>
        )}
        name="required"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  show: {
    flexDirection: 'row',
  },
});

export const TagEditor = React.forwardRef(TagEditorComponent);
