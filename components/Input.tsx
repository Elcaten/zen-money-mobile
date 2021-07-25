import React, {forwardRef, ForwardRefRenderFunction, useMemo} from 'react';
import {InputHandles, Input as RNEInput, InputProps} from 'react-native-elements';
import {useNavigatorThemeColors} from '../themes';

const InputComponent: ForwardRefRenderFunction<InputHandles, InputProps> = (props, ref) => {
  const {text, secondaryText} = useNavigatorThemeColors();
  const baseStyles = useMemo(() => {
    return {color: text, fontSize: 16};
  }, [text]);

  return (
    <RNEInput
      ref={ref as any}
      placeholderTextColor={secondaryText}
      errorStyle={[styles.error, props.errorStyle]}
      containerStyle={[styles.container, props.containerStyle]}
      style={[baseStyles, props.style]}
      {...props}
    />
  );
};

export const Input = forwardRef(InputComponent);

typeof RNEInput.displayName;

import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  error: {
    display: 'none',
  },
  container: {
    paddingHorizontal: 0,
  },
});
