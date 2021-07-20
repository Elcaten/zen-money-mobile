import {TextInputProps} from 'react';
import 'react-native-elements';

declare module 'react-native-elements' {
  export class InputHandles {
    focus(): void;
    blur(): void;
    clear(): void;
    isFocused(): boolean;
    setNativeProps(nativeProps: Partial<TextInputProps>): void;
    shake: () => void;
  }
}
