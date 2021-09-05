import React from 'react';
import {useTranslation} from 'react-i18next';
import {Tag} from '../../api/models';
import {BadgeButton} from './BadgeButton';
import {TagIcon} from './TagIcon';

export const SyncTagPicker: React.FC<{onPress: () => void; tag: Tag | null | undefined}> = ({onPress, tag}) => {
  const {t} = useTranslation();

  return (
    <BadgeButton
      icon={<TagIcon icon={tag?.icon} color={tag?.color} size={18} />}
      title={tag?.title ?? t('Tags.Uncategorized')}
      onPress={onPress}
    />
  );
};
