import i18n from 'i18next';
import {Alert} from 'react-native';

export const confirmDelete = async (title: string, message: string) => {
  return new Promise<boolean>((resolve) => {
    Alert.alert(title, message, [
      {
        text: i18n.t('Button.Cancel'),
        onPress: () => resolve(false),
        style: 'cancel',
      },
      {
        text: i18n.t('Button.Delete'),
        onPress: () => resolve(true),
      },
    ]);
  });
};
