import React, {useCallback, useMemo} from 'react';
import {AccountType} from '../../../api/models';
import {PickerListItem} from '../../../components/ListItem';
import {useAccountTypes} from '../../../hooks';
import {useTranslation} from 'react-i18next';
import {useZenActionSheet} from '../../../hooks/useZenActionSheet';

export const AccountTypePicker: React.FC<{
  title: string;
  value: string | undefined;
  onSelect: (account: AccountType) => void;
}> = ({title, value, onSelect}) => {
  const {t} = useTranslation();

  const accoutTypes = useAccountTypes()
    .entriesArray()
    // eslint-disable-next-line no-shadow
    .map(([id, title]) => ({id, title}));

  const actionSheetOptions = useMemo(() => {
    return accoutTypes.map((x) => x.title).concat(t('Button.Cancel'));
  }, [accoutTypes, t]);

  const onActionSelect = useCallback((i: number) => onSelect(accoutTypes[i].id), [accoutTypes, onSelect]);

  const {showActionSheet} = useZenActionSheet(actionSheetOptions, onActionSelect);

  return <PickerListItem bottomDivider title={title} value={value} onPress={showActionSheet} />;
};
