import React from 'react';
import {useTranslation} from 'react-i18next';
import {WalletIcon} from '../../components';
import {BadgeButton} from './BadgeButton';

export const SyncAccountPicker: React.FC<{onPress: () => void; title: string | null | undefined}> = ({
  onPress,
  title,
}) => {
  const {t} = useTranslation();

  return <BadgeButton icon={<WalletIcon size={18} />} title={title ?? t('Accounts.NoAccount')} onPress={onPress} />;
};
