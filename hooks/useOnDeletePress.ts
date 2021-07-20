import {useCallback} from 'react';
import {useTranslation} from 'react-i18next';
import {Alert} from 'react-native';

export const useDeletePress = (title: string, message: string, onConfirm: () => void) => {
  const {t} = useTranslation();

  return useCallback(() => {
    Alert.alert(title, message, [
      {
        text: t('Button.Cancel'),
        onPress: () => {},
        style: 'cancel',
      },
      {
        text: t('Button.Delete'),
        onPress: onConfirm,
      },
    ]);
  }, [message, onConfirm, t, title]);
};
