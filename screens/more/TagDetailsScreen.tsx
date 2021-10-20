import * as React from 'react';
import {useCallback, useEffect, useMemo, useRef} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {Divider} from 'react-native-elements';
import {useQueryClient} from 'react-query';
import {useMutateTag} from '../../api-hooks';
import {QueryKeys} from '../../api-hooks/query-keys';
import {useDeleteTag, useTags} from '../../api-hooks/useTags';
import {Tag} from '../../api/models';
import {Card} from '../../components/Card';
import {TextInputField} from '../../components/Field';
import {ListItem, OptionListItem, PickerListItem, SwitchListItem} from '../../components/ListItem';
import {ScrollView} from '../../components/ScrollView';
import {ZenTextInputHandles} from '../../components/ZenTextInput/ZenTextInput';
import {useHeaderButtons} from '../../hooks/useHeaderButtons';
import {TagDetailsScreenProps} from '../../types';
import {confirmDelete, generateUUID, showToast} from '../../utils';
import {TagIcon} from '../components';
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

  const possibleParentTags = useMemo<Tag[]>(() => {
    const tagsArr = Array.from(tags.data?.values());
    const topLevelTags = tagsArr.filter(({parent}) => parent == null);

    if (tag?.parent != null) {
      return topLevelTags;
    }

    const tagHasChildren = tagsArr.some((i) => i.parent === tag?.id);

    if (tagHasChildren) {
      return [];
    }

    return topLevelTags.filter((i) => i.id !== tag?.id);
  }, [tag?.id, tag?.parent, tags.data]);

  const iconColor = watch('color');
  const iconName = watch('icon');

  const titleRef = useRef<ZenTextInputHandles>(null);
  useEffect(() => {
    if (errors.title) {
      titleRef.current?.shake();
    }
  }, [errors.title]);

  return (
    <ScrollView disabled={isMutating || isDeleting}>
      <Controller
        control={control}
        render={({field}) => <TextInputField ref={titleRef} field={field} placeholder={t('TagDetailsScreen.Title')} />}
        name="title"
        rules={{required: true}}
      />

      <ListItem
        bottomDivider
        onPress={() => {
          navigation.navigate('IconPickerScreen', {
            icon: iconName,
            color: iconColor,
            onSave: (i, c) => {
              setValue('icon', i);
              setValue('color', c);
            },
          });
        }}>
        <ListItem.Title style={{flex: 1}}>{t('TagListPickerScreen.Icon')}</ListItem.Title>
        <TagIcon icon={iconName} size={20} color={iconColor} />
        <ListItem.Chevron size={20} />
      </ListItem>

      <Controller
        control={control}
        render={({field: {onChange, value}}) => {
          if (possibleParentTags.length === 0) {
            return <></>;
          }
          return (
            <PickerListItem
              title={t('TagDetailsScreen.Parent')}
              value={tags.data.get(value!)?.title}
              onPress={() => {
                navigation.navigate('TagListPickerScreen', {
                  tagIds: possibleParentTags.map((x) => x.id),
                  onSelect: (tagId) => {
                    onChange(tagId);
                    navigation.goBack();
                  },
                });
              }}
            />
          );
        }}
        name="parent"
      />

      <Divider />
      <Card>
        <Card.Title>{t('TagDetailsScreen.Show')}</Card.Title>
        <Controller
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <SwitchListItem title={t('TagDetailsScreen.Expense')} onValueChange={onChange} value={value} />
          )}
          name="showOutcome"
        />
        <Controller
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <SwitchListItem title={t('TagDetailsScreen.Income')} onValueChange={onChange} value={value} />
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
            <OptionListItem title={t('TagDetailsScreen.Fixed')} onPress={() => onChange(true)} checked={!!value} />
            <OptionListItem title={t('TagDetailsScreen.Flexible')} onPress={() => onChange(false)} checked={!value} />
          </Card>
        )}
        name="required"
      />
    </ScrollView>
  );
};
