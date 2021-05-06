declare module '*.svg' {
  import React from 'react';
  import {SvgProps} from 'react-native-svg';
  const content: React.FC<SvgProps>;
  export default content;
}

import {resources} from './init-i18n';

declare module 'react-i18next' {
  type DefaultResources = typeof resources['en'];
  interface Resources extends DefaultResources {}
}

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
