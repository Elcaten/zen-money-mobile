import {RefObject, useEffect} from 'react';
import {FieldError} from 'react-hook-form';

interface ShakeHandles {
  shake: () => void;
}

export const useShakeOnError = (inputRef: RefObject<ShakeHandles>, error: FieldError | undefined) => {
  useEffect(() => {
    if (error) {
      inputRef.current?.shake();
    }
  }, [error, inputRef]);

  return inputRef;
};
