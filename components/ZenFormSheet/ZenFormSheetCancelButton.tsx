import * as React from 'react';
import {useTranslation} from 'react-i18next';
import {Button} from 'react-native-elements';

export interface ZenFormSheetCancelButtonProps {
  onPress: () => void;
}

export const ZenFormSheetCancelButton: React.FC<ZenFormSheetCancelButtonProps> = ({onPress}) => {
  const {t} = useTranslation();

  return <Button title={t('Button.Cancel')} type="clear" onPress={onPress} />;
};
