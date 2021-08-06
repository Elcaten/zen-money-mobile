import {useFocusEffect} from '@react-navigation/native';
import {RefObject, useCallback, useState} from 'react';

export const useFocusInput = (inputRef: RefObject<{focus: () => void}>) => {
  const [isFirstFocus, setIsFirstFocus] = useState(true);
  useFocusEffect(
    useCallback(() => {
      setTimeout(() => {
        if (isFirstFocus && inputRef.current) {
          inputRef.current.focus();
          setIsFirstFocus(false);
        }
      }, 0);
    }, [inputRef, isFirstFocus]),
  );
};
