declare module 'react-native-elements' {
  import React, {TextInputProps} from 'react';

  export class InputHandles {
    focus(): void;
    blur(): void;
    clear(): void;
    isFocused(): boolean;
    setNativeProps(nativeProps: Partial<TextInputProps>): void;
    shake: () => void;
  }
}