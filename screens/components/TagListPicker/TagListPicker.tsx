import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {StyleProp, ViewStyle} from 'react-native';
import {Tag} from '../../../api/models';
import {TagIcon} from '../../../components';
import {PickerListItem} from '../../../components/ListItem';
import {TagListPickerDialog} from './TagListPickerDialog';

export interface TagListPickerProps {
  tag: Tag | null | undefined;
  onSelect: (tag: Tag | null) => void;
  RenderAs?: React.FC<{onPress: () => void; tag: Tag | null | undefined}>;
}

export const TagListPicker: React.FC<TagListPickerProps> = ({tag, onSelect, RenderAs}) => {
  const [visible, setVisible] = useState(false);
  const toggleVisible = () => setVisible((v) => !v);

  const {t} = useTranslation();

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
