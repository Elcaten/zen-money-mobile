import dayjs from 'dayjs';
import React, {useEffect, useState} from 'react';
import {Controller, FieldArrayWithId, useFieldArray, useForm, useWatch} from 'react-hook-form';
import {FlatList, ListRenderItem} from 'react-native';
import {ListItem} from 'react-native-elements';
import {useTags} from '../../api-hooks';
import {CategoryInfo, useStore} from '../../store/use-store';
import {useOperations} from '../../tinkoff/useOperations';
import {SyncTagSettingsScreenProps} from '../../types';
import {extractId, showToast} from '../../utils';
import {SyncTagPicker} from '../components/SyncTagPicker';
import {TagListPicker} from '../components/TagListPicker';

export const SyncTagSettingsScreen: React.FC<SyncTagSettingsScreenProps> = ({}) => {
  const {data: tags} = useTags();

  // fetch last month operations
  const [monthAgo] = useState(dayjs(new Date()).subtract(4, 'week').toDate());
  const [now] = useState(new Date());
  const {data: lastMonthOperations, isLoading, invalidate} = useOperations(monthAgo, now);

  // set up form
  const storedCategories = useStore.use.categoryInfo();
  const {control, setValue} = useForm<{categoryInfo: CategoryInfo[]}>({});
  const {fields, update} = useFieldArray({
    control,
    name: 'categoryInfo',
  });

  // get new categroies (if any) from operations and update the form
  useEffect(() => {
    const lastWeekCategories = new Map(
      lastMonthOperations?.filter((o) => o.category != null)?.map((o) => [o.category.id, o.category]),
    ).valuesArray();

    const result = [...storedCategories];
    for (const category of lastWeekCategories) {
      if (!storedCategories.some((i) => i.categoryId === category.id)) {
        result.push({categoryId: category.id, categoryName: category.name});
      }
    }
    setValue(
      'categoryInfo',
      result.sort((a, b) => a.categoryName.localeCompare(b.categoryName)),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastMonthOperations]);

  // update the store when form data changes
  const formData = useWatch({control, name: 'categoryInfo'});
  const setStoredCategories = useStore.use.setCategoryInfo();
  const [modifedByUser, setModifiedByUser] = useState(false);
  useEffect(() => {
    if (modifedByUser) {
      setStoredCategories(formData);
      showToast('Saved');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData, modifedByUser]);

  const renderItem: ListRenderItem<ListItem> = ({item, index}) => {
    return (
      <Controller
        control={control}
        name={`categoryInfo.${index}.categoryId` as 'categoryInfo.0.categoryId'}
        render={() => (
          <ListItem bottomDivider>
            <ListItem.Title style={{flex: 1}}>{item.categoryName}</ListItem.Title>
            <TagListPicker
              containerStyle={{flexDirection: 'row', marginTop: 8}}
              RenderAs={SyncTagPicker}
              tag={tags.get(item.tagId!)!}
              onSelect={(tag) => {
                update(index, {
                  ...item,
                  tagId: tag.id,
                  tagTitle: tag.title,
                });
                setModifiedByUser(true);
              }}
            />
          </ListItem>
        )}
      />
    );
  };

  if (tags == null || tags.size === 0) {
    return null;
  }

  return (
    <FlatList
      data={fields}
      keyExtractor={extractId}
      renderItem={renderItem}
      refreshing={isLoading}
      onRefresh={invalidate}
    />
  );
};

type ListItem = FieldArrayWithId<
  {
    categoryInfo: CategoryInfo[];
  },
  'categoryInfo',
  'id'
>;
