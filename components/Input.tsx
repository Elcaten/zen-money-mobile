import React, {forwardRef, ForwardRefRenderFunction, useMemo} from 'react';
import {InputHandles, Input as RNEInput, InputProps} from 'react-native-elements';
import {useNavigatorThemeColors} from '../themes';

const InputComponent: ForwardRefRenderFunction<InputHandles, InputProps> = (props, ref) => {
  const {text, placeholder} = useNavigatorThemeColors();
  const baseStyles = useMemo(() => {
    return {color: text};
  }, [text]);

  return <RNEInput ref={ref as any} placeholderTextColor={placeholder} {...props} style={[baseStyles, props.style]} />;
};

export const Input = forwardRef(InputComponent);

typeof RNEInput.displayName;
