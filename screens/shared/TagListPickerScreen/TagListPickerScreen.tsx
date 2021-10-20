import React, {useCallback, useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import {FlatList, ListRenderItemInfo} from 'react-native';
import {useTags} from '../../../api-hooks';
import {Tag} from '../../../api/models';
import {ListItem} from '../../../components/ListItem';
import {TagListPickerScreenProps} from '../../../types';
import {extractId} from '../../../utils';
import {TagListItem} from '../../components/TagListItem';

export const TagListPickerScreen: React.FC<TagListPickerScreenProps> = ({route}) => {
  const {data} = useTags();
  const tags = useMemo(() => {
    return route.params.tagIds.map((id) => data.get(id)!).sort((a, b) => a.title.localeCompare(b.title));
  }, [data, route.params.tagIds]);

  const {t} = useTranslation();

  const renderHeader = useCallback(() => {
    return (
      <ListItem onPress={() => route.params.onSelect(null)}>
        <ListItem.Title>{t('TagListPickerScreen.NoTag')}</ListItem.Title>
      </ListItem>
    );
  }, [route.params, t]);

  const renderTag = useCallback(
    (info: ListRenderItemInfo<Tag>) => (
      <TagListItem tag={info.item} onPress={() => route.params.onSelect(info.item.id)} />
    ),
    [route.params],
  );

  return <FlatList ListHeaderComponent={renderHeader} data={tags} keyExtractor={extractId} renderItem={renderTag} />;
};
