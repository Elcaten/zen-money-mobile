import * as React from 'react';
import {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {StyleSheet} from 'react-native';
import {Button, Divider} from 'react-native-elements';
import {useQueryClient} from 'react-query';
import {useMutateTag} from '../../api-hooks';
import {QueryKeys} from '../../api-hooks/query-keys';
import {useDeleteTag, useTags} from '../../api-hooks/useTags';
import {Tag} from '../../api/models';
import {View} from '../../components';
import {Card} from '../../components/Card';
import {ListItem} from '../../components/ListItem';
import {ZenTextInput} from '../../components/ZenTextInput';
import {ZenTextInputHandles} from '../../components/ZenTextInput/ZenTextInput';
import {useHeaderButtons} from '../../hooks/useHeaderButtons';
import {TagDetailsScreenProps} from '../../types';
import {confirmDelete, generateUUID, showToast} from '../../utils';
import {TagIcon} from '../components';
import {RadioButton} from '../components/RadioButton';
import {TagPicker} from '../components/TagPicker';
import {EditableTag} from './editable-tag';

export const TagDetailsScreen: React.FC<TagDetailsScreenProps> = ({navigation, route}) => {
  const tags = useTags();
  const tag = useMemo<EditableTag>(
    () =>
      tags.data?.get(route.params.tagId!) ?? {
        id: generateUUID(),
        title: '',
        parent: null,
        icon: null,
        color: null,
        showIncome: true,
        showOutcome: true,
        required: false,
      },
    [route.params.tagId, tags.data],
  );

  const {t} = useTranslation();
  const queryClient = useQueryClient();

  const {
    control,
    setValue,
    watch,
    handleSubmit,
    formState: {errors},
  } = useForm<EditableTag>({defaultValues: tag});

  const {mutateAsync, isLoading: isMutating} = useMutateTag();

  const onSavePress = useMemo(
    () =>
      handleSubmit(async (editableTag: EditableTag) => {
        const {success} = await mutateAsync(editableTag);
        if (success) {
          showToast(t('TagDetailsScreen.CategorySaved'));
          if (navigation.isFocused()) {
            navigation.pop();
          }
          queryClient.invalidateQueries(QueryKeys.Tags);
        } else {
          showToast(t('Error.UnexpectedError'));
        }
      }),
    [handleSubmit, mutateAsync, navigation, queryClient, t],
  );

  const {mutateAsync: deleteAsync, isLoading: isDeleting} = useDeleteTag();

  const onDeletePress = useCallback(async () => {
    const confirm = await confirmDelete(
      t('TagDetailsScreen.DeleteCategoryTitle'),
      t('TagDetailsScreen.DeleteCategoryMessage'),
    );

    if (confirm) {
      const {success} = await deleteAsync(tag.id);
      if (success) {
        showToast(t('TagDetailsScreen.DeleteCategorySuccessMessage'));
        if (navigation.isFocused()) {
          navigation.pop();
        }
        queryClient.invalidateQueries(QueryKeys.Tags);
      } else {
        showToast(t('Error.UnexpectedError'));
      }
    }
  }, [deleteAsync, navigation, queryClient, t, tag.id]);

  const isNewTag = route.params.tagId == null;
  useHeaderButtons(
    navigation,
    isNewTag ? {onSavePress, disabled: isMutating} : {onDeletePress, onSavePress, disabled: isMutating || isDeleting},
  );

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

  const titleRef = useRef<ZenTextInputHandles>(null);
  useEffect(() => {
    if (errors.title) {
      titleRef.current?.shake();
    }
  }, [errors.title]);

  return (
    <View disabled={isMutating || isDeleting}>
      <View style={styles.headerContainer}>
        <View>
          <TagIcon icon={iconName} size={48} color={iconColor} style={styles.headerIcon} />
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
        <View style={styles.flexFill}>
          <Controller
            control={control}
            render={({field: {onChange, onBlur, value}}) => (
              <ZenTextInput
                ref={titleRef}
                placeholder={t('TagDetailsScreen.Title')}
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
  headerContainer: {
    flexDirection: 'row',
    margin: 8,
  },
  headerIcon: {
    marginRight: 16,
  },
  flexFill: {
    flex: 1,
  },
});
