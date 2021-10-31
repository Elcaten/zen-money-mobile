import {useActionSheet} from '@expo/react-native-action-sheet';
import {useCallback} from 'react';
import {useNavigatorTheme} from '../themes';

export const useZenActionSheet = (options: string[], onSelect: (index: number) => void) => {
  const {showActionSheetWithOptions} = useActionSheet();
  const {dark} = useNavigatorTheme();

  const cancelButtonIndex = options.length - 1;

  const showActionSheet = useCallback(() => {
    showActionSheetWithOptions(
      {
        options: options,
        cancelButtonIndex: cancelButtonIndex,
        userInterfaceStyle: dark ? 'dark' : 'light',
      },
      (i) => {
        if (i != null && i !== cancelButtonIndex) {
          onSelect(i);
        }
      },
    );
  }, [showActionSheetWithOptions, options, cancelButtonIndex, dark, onSelect]);

  return {showActionSheet};
};
