import React, {forwardRef, ForwardRefRenderFunction, useImperativeHandle, useMemo, useRef} from 'react';
import {TextInput, TextInputProps, Easing, Animated, StyleProp, ViewStyle, StyleSheet} from 'react-native';
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
  const {text, placeholder} = useNavigatorThemeColors();
  const baseStyles = useMemo(() => {
    return {color: text, fontSize: getFontSize(size)};
  }, [size, text]);

  const {current: shakeAnimationValue} = useRef(new Animated.Value(0));

  const translateX = shakeAnimationValue.interpolate({
    inputRange: [0, 0.5, 1, 1.5, 2, 2.5, 3],
    outputRange: [0, -15, 0, 15, 0, -15, 0],
  });

  const textInputRef = useRef<TextInput>(null);
  useImperativeHandle(
    ref,
    () => {
      return {
        focus: () => textInputRef.current?.focus(),
        blur: () => textInputRef.current?.blur(),
        clear: () => textInputRef.current?.clear(),
        isFocused: () => !!textInputRef.current?.isFocused(),
        shake: () => {
          shakeAnimationValue.setValue(0);
          Animated.timing(shakeAnimationValue, {
            duration: 375,
            toValue: 3,
            easing: Easing.bounce,
            useNativeDriver: true,
          }).start();
        },
      };
    },
    [shakeAnimationValue],
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
      <TextInput ref={textInputRef} placeholderTextColor={placeholder} {...rest} style={[baseStyles, rest.style]} />
    </Animated.View>
  );
};

export const ZenTextInput = forwardRef(ZenTextInputComponent);
