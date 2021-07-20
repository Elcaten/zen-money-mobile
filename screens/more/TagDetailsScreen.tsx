import {Ionicons, MaterialCommunityIcons} from '@expo/vector-icons';
import * as React from 'react';
import {useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {StyleSheet} from 'react-native';
import {Button, Divider, InputHandles} from 'react-native-elements';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import {useQueryClient} from 'react-query';
import {useMutateTag} from '../../api-hooks';
import {QueryKeys} from '../../api-hooks/query-keys';
import {useDeleteTag, useTags} from '../../api-hooks/useTags';
import {Tag} from '../../api/models';
import {Input, View} from '../../components';
import {Card} from '../../components/Card';
import {ListItem} from '../../components/ListItem';
import {TagDetailsScreenProps} from '../../types';
import {showToast} from '../../utils';
import {generateUUID} from '../../utils/generate-uuid';
import {TagIcon} from '../components';
import {RadioButton} from '../components/RadioButton';
import {TagPicker} from '../components/TagPicker';
import {EditableTag} from './editable-tag';

export const emptyTag: EditableTag = {
  id: generateUUID(),
  title: '',
  parent: null,
  icon: null,
  color: null,
  showIncome: true,
  showOutcome: true,
  required: false,
};

export const TagDetailsScreen: React.FC<TagDetailsScreenProps> = ({navigation, route}) => {
  const tags = useTags();
  const tag = useMemo(() => tags.data?.get(route.params.tagId!) ?? emptyTag, [route.params.tagId, tags.data]);

  const {t} = useTranslation();
  const queryClient = useQueryClient();

  const {
    control,
    setValue,
    watch,
    handleSubmit,
    formState: {errors},
  } = useForm<EditableTag>({defaultValues: tag ?? emptyTag});

  const {mutateAsync, isLoading: isMutating} = useMutateTag();
  const onSavePress = useCallback(
    async (editableTag: EditableTag) => {
      await mutateAsync(editableTag);
      await queryClient.invalidateQueries(QueryKeys.Tags);
      showToast(t('TagDetailsScreen.CategorySaved'));
      navigation.pop();
    },
    [mutateAsync, navigation, queryClient, t],
  );

  const titleRef = useRef<InputHandles>(null);
  useEffect(() => {
    if (errors.title) {
      titleRef.current?.shake();
    }
  }, [errors.title]);

  const {mutateAsync: deleteAsync, isLoading: isDeleting} = useDeleteTag();
  const onDeletePress = useCallback(async () => {
    await deleteAsync(tag.id);
    await queryClient.invalidateQueries(QueryKeys.Tags);
    showToast(t('TagDetailsScreen.CategoryDeleted'));
    navigation.pop();
  }, [deleteAsync, navigation, queryClient, t, tag.id]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButtons>
          <Item
            title={t('TagDetailsScreen.Edit')}
            IconComponent={MaterialCommunityIcons}
            iconName="delete-outline"
            iconSize={24}
            onPress={onDeletePress}
          />
          <Item
            title={t('TagDetailsScreen.Save')}
            IconComponent={Ionicons}
            iconName="save-outline"
            iconSize={24}
            onPress={handleSubmit(onSavePress)}
          />
        </HeaderButtons>
      ),
    });
  }, [deleteAsync, handleSubmit, navigation, onDeletePress, onSavePress, t]);

  const [possibleParentTags, setPossibleParentTags] = useState<Tag[]>([]);
  useEffect(() => {
    const tagsArr = Array.from(tags.data?.values());
    const topLevelTags = tagsArr.filter(({parent}) => parent == null);

    if (tag?.parent != null) {
      setPossibleParentTags(topLevelTags);
      return;
    }

    const tagHasChildren = tagsArr.some((i) => i.parent === tag?.id);
    if (!tagHasChildren) {
      setPossibleParentTags(topLevelTags.filter((i) => i.id !== tag?.id));
    }
  }, [tag, tags.data]);

  const iconColor = watch('color');
  const iconName = watch('icon');

  return (
    <View
      style={isMutating || isDeleting ? styles.disabledView : []}
      pointerEvents={isMutating || isDeleting ? 'none' : 'auto'}>
      <View style={{flexDirection: 'row', margin: 8}}>
        <View>
          <TagIcon icon={iconName} color={iconColor} style={{margin: 16}} />
          <Button
            type="clear"
            title="Edit"
            onPress={() =>
              navigation.navigate('IconPickerScreen', {
                icon: iconName,
                color: iconColor,
                onSave: (i, c) => {
                  setValue('icon', i);
                  setValue('color', c);
                },
              })
            }
          />
        </View>
        <View style={{flex: 1}}>
          <Controller
            control={control}
            render={({field: {onChange, onBlur, value}}) => (
              <Input
                ref={titleRef}
                placeholder={t('TagDetailsScreen.Title')}
                value={value}
                style={{fontSize: 16}}
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
              return <TagPicker tags={possibleParentTags} selectedTag={value} onSelect={onChange} />;
            }}
            name="parent"
          />
        </View>
      </View>

      <Divider />
      <Card>
        <Card.Title>{t('TagDetailsScreen.Show')}</Card.Title>
        <Controller
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <ListItem onPress={() => onChange(!value)}>
              <ListItem.CheckBox checked={value} onBlur={onBlur} />
              <ListItem.Title>{t('TagDetailsScreen.Expense')}</ListItem.Title>
            </ListItem>
          )}
          name="showOutcome"
        />
        <Controller
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <ListItem onPress={() => onChange(!value)}>
              <ListItem.CheckBox checked={value} onBlur={onBlur} />
              <ListItem.Title>{t('TagDetailsScreen.Income')}</ListItem.Title>
            </ListItem>
          )}
          name="showIncome"
        />
      </Card>

      <Divider />
      <Controller
        control={control}
        render={({field: {onChange, value}}) => (
          <Card>
            <Card.Title>{t('TagDetailsScreen.SpendingTitle')}</Card.Title>
            <ListItem onPress={() => onChange(true)}>
              <RadioButton checked={!!value} />
              <ListItem.Content>
                <ListItem.Title>{t('TagDetailsScreen.Fixed')}</ListItem.Title>
              </ListItem.Content>
            </ListItem>
            <ListItem onPress={() => onChange(false)}>
              <RadioButton checked={!value} />
              <ListItem.Content>
                <ListItem.Title>{t('TagDetailsScreen.Flexible')}</ListItem.Title>
              </ListItem.Content>
            </ListItem>
          </Card>
        )}
        name="required"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  disabledView: {
    opacity: 0.5,
  },
});
