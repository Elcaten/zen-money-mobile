import React, {useMemo, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useTags} from '../../../api-hooks';
import {Tag} from '../../../api/models';
import {TagIcon} from '../../../components';
import {PickerListItem} from '../../../components/ListItem';
import {TagListPickerDialog} from './TagListPickerDialog';

export interface TagListPickerProps {
  tagId: string | null | undefined;
  onSelect: (tag: Tag | null) => void;
  RenderAs?: React.FC<{onPress: () => void; tag: Tag | null | undefined}>;
}

export const TagListPicker: React.FC<TagListPickerProps> = ({tagId, onSelect, RenderAs}) => {
  const [visible, setVisible] = useState(false);
  const toggleVisible = () => setVisible((v) => !v);

  const {data: tags} = useTags();
  const {t} = useTranslation();

  const tag = useMemo(() => tags.tryGet(tagId, undefined), [tagId, tags]);

  return (
    <React.Fragment>
      <TagListPickerDialog value={tag?.id} onSelect={onSelect} visible={visible} onRequestClose={toggleVisible} />
      {RenderAs ? (
        <RenderAs onPress={toggleVisible} tag={tag} />
      ) : (
        <PickerListItem
          bottomDivider
          leftIcon={() => <TagIcon />}
          title={tag?.title ?? t('Tags.Uncategorized')}
          onPress={toggleVisible}
        />
      )}
    </React.Fragment>
  );
};
