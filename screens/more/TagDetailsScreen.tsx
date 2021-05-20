import {MaterialIcons} from '@expo/vector-icons';
import * as React from 'react';
import {useCallback, useEffect, useLayoutEffect, useMemo, useRef} from 'react';
import {useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {StyleSheet} from 'react-native';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import {useQueryClient} from 'react-query';
import {useMutateTag} from '../../api-hooks';
import {QueryKeys} from '../../api-hooks/query-keys';
import {useDeleteTag, useTags} from '../../api-hooks/useTags';
import {TagDetailsScreenProps} from '../../types';
import {generateUUID} from '../../utils/generate-uuid';
import {EditableTag, TagEditor, TagEditorHandles} from '../components';

export const emptyTag: EditableTag = {
  id: generateUUID(),
  title: '',
  parent: null,
  icon: null,
  showIncome: true,
  showOutcome: true,
  required: false,
};

export const TagDetailsScreen: React.FC<TagDetailsScreenProps> = ({navigation, route}) => {
  const tags = useTags();
  const tag = useMemo(() => tags.data?.get(route.params.tagId!) ?? emptyTag, [route.params.tagId, tags.data]);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<EditableTag>({defaultValues: tag ?? emptyTag});

  const {mutateAsync, isLoading: isMutating} = useMutateTag();
  const onSavePress = useCallback(
    (editableTag: EditableTag) => {
      mutateAsync(editableTag);
    },
    [mutateAsync],
  );

  const ref = useRef<TagEditorHandles>(null);
  useEffect(() => {
    if (errors.title) {
      ref.current?.shakeTitle();
    }
  }, [errors.title]);

  const {mutateAsync: deleteAsync, isLoading: isDeleting} = useDeleteTag();
  const queryClient = useQueryClient();
  const onDeletePress = useCallback(async () => {
    await deleteAsync(tag.id);
    await queryClient.invalidateQueries(QueryKeys.Tags);
    navigation.pop();
  }, [deleteAsync, navigation, queryClient, tag]);

  const {t} = useTranslation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButtons>
          <Item
            title={t('Screen.Tag.Edit')}
            IconComponent={MaterialIcons}
            iconName="delete"
            iconSize={24}
            onPress={onDeletePress}
          />
          <Item title={t('Screen.Tag.Save')} onPress={handleSubmit(onSavePress)} />
        </HeaderButtons>
      ),
    });
  }, [deleteAsync, handleSubmit, navigation, onDeletePress, onSavePress, t]);

  const possibleParentTags = useMemo(() => {
    const tagsArr = Array.from(tags.data?.values());
    const topLevelTags = tagsArr.filter(({parent}) => parent == null);

    if (tag?.parent != null) {
      return topLevelTags;
    }

    const tagHasChildren = tagsArr.some((i) => i.parent === tag?.id);
    if (tagHasChildren) {
      return [];
    } else {
      return topLevelTags.filter((i) => i.id !== tag?.id);
    }
  }, [tag, tags.data]);

  return (
    <TagEditor
      ref={ref}
      control={control}
      parentTags={possibleParentTags}
      style={isMutating || isDeleting ? styles.disabledView : []}
      pointerEvents={isMutating || isDeleting ? 'none' : 'auto'}
    />
  );
};

const styles = StyleSheet.create({
  disabledView: {
    opacity: 0.5,
  },
});
