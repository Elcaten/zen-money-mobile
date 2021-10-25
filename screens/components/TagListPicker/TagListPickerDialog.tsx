import React, {useCallback} from 'react';
import {useTranslation} from 'react-i18next';
import {useSortedByParentTags} from '../../../api-hooks';
import {Tag} from '../../../api/models';
import {CheckIcon} from '../../../components';
import {ListItem} from '../../../components/ListItem';
import {ZenFormSheet} from '../../../components/ZenFormSheet';
import {TagListItem} from '../TagListItem';
import {TagList} from '../TagList/TagList';

export interface TagListPickerDialogProps {
  visible: boolean;
  onRequestClose: () => void;
  value: string | undefined;
  onSelect: (tag: Tag | null) => void;
}

export const TagListPickerDialog: React.FC<TagListPickerDialogProps> = ({onSelect, value, visible, onRequestClose}) => {
  const {tags} = useSortedByParentTags();
  const {t} = useTranslation();

  const renderHeader = useCallback(() => {
    return (
      <ListItem
        onPress={() => {
          onSelect(null);
          onRequestClose();
        }}>
        <ListItem.Title>{t('TagListPickerScreen.NoTag')}</ListItem.Title>
      </ListItem>
    );
  }, [onRequestClose, onSelect, t]);

  const renderItem = (tag: Tag) => (
    <TagListItem
      tag={tag}
      rightIcon={() => (value === tag.id ? <CheckIcon /> : null)}
      iconsStyle={{marginLeft: tag.parent ? 32 : 0}}
      onPress={(newTag: Tag) => {
        onSelect(newTag);
        onRequestClose();
      }}
    />
  );

  return (
    <ZenFormSheet visible={visible} onRequestClose={onRequestClose}>
      <ZenFormSheet.Header>
        <ZenFormSheet.CancelButton onPress={onRequestClose} />
      </ZenFormSheet.Header>
      <TagList tags={tags} renderItem={renderItem} HeaderComponent={renderHeader} />
    </ZenFormSheet>
  );
};
