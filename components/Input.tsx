import React, {forwardRef, ForwardRefRenderFunction} from 'react';
import {InputHandles, Input as RNEInput, InputProps} from 'react-native-elements';

const InputComponent: ForwardRefRenderFunction<InputHandles, InputProps> = (props, ref) => {
  return <RNEInput ref={ref as any} {...props} />;
};

export const Input = forwardRef(InputComponent);

typeof RNEInput.displayName;
