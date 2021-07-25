import React, {forwardRef, ForwardRefRenderFunction, useImperativeHandle, useMemo, useRef} from 'react';
import {Animated, StyleProp, StyleSheet, TextInput, TextInputProps, ViewStyle} from 'react-native';
import {useShake} from '../../hooks';
import {useNavigatorThemeColors} from '../../themes';
import {FontSize, getFontSize} from '../../utils';

export type ZenTextInputHandles = Pick<TextInput, 'focus' | 'blur' | 'clear' | 'isFocused'> & {
  shake: () => void;
};

export type ZenTextInputProps = TextInputProps & {
  size?: FontSize;
  containerStyle?: StyleProp<ViewStyle>;
};

const ZenTextInputComponent: ForwardRefRenderFunction<ZenTextInputHandles, ZenTextInputProps> = (
  {size, containerStyle, ...rest},
  ref,
) => {
  const {text, secondaryText} = useNavigatorThemeColors();
  const baseStyles = useMemo(() => {
    return {color: text, fontSize: getFontSize(size)};
  }, [size, text]);

  const {translateX, shake} = useShake();

  const textInputRef = useRef<TextInput>(null);
  useImperativeHandle(
    ref,
    () => {
      return {
        focus: () => textInputRef.current?.focus(),
        blur: () => textInputRef.current?.blur(),
        clear: () => textInputRef.current?.clear(),
        isFocused: () => !!textInputRef.current?.isFocused(),
        shake,
      };
    },
    [shake],
  );

  return (
    <Animated.View
      style={StyleSheet.flatten([
        {
          flexDirection: 'row',
          alignItems: 'center',
        },
        containerStyle as any,
        {transform: [{translateX}]},
      ])}>
      <TextInput ref={textInputRef} placeholderTextColor={secondaryText} {...rest} style={[baseStyles, rest.style]} />
    </Animated.View>
  );
};

export const ZenTextInput = forwardRef(ZenTextInputComponent);
