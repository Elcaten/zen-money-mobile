import React, {forwardRef, useImperativeHandle, useRef} from 'react';
import {StyleSheet} from 'react-native';
import {ListItem} from '../ListItem';
import {ZenTextInput} from '../ZenTextInput';
import {ZenTextInputHandles} from '../ZenTextInput/ZenTextInput';

export interface NumberInputFieldHandle {
  shake: () => void;
  focus: () => void;
}

export interface NumberInputFieldProps {
  leftIcon?: () => JSX.Element;
  rightIcon?: () => JSX.Element;
  field: {
    onChange: (...event: any[]) => void;
    onBlur: () => void;
    value: string;
  };
}

const NumberInputFieldComponent: React.ForwardRefRenderFunction<NumberInputFieldHandle, NumberInputFieldProps> = (
  {field: {onChange, onBlur, value}, leftIcon, rightIcon},
  ref,
) => {
  const inputRef = useRef<ZenTextInputHandles>(null);

  useImperativeHandle(
    ref,
    () => ({
      shake: () => inputRef.current?.shake(),
      focus: () => inputRef.current?.focus(),
    }),
    [],
  );

  return (
    <ListItem bottomDivider>
      {leftIcon && leftIcon()}
      <ZenTextInput
        ref={inputRef}
        placeholder={'0'}
        textAlign="right"
        containerStyle={styles.flexFill}
        style={styles.flexFill}
        keyboardType="numeric"
        value={value.toString()}
        onBlur={onBlur}
        size="giant"
        onChangeText={onChange}
      />
      {rightIcon && rightIcon()}
    </ListItem>
  );
};

export const NumberInputField = forwardRef(NumberInputFieldComponent);

const styles = StyleSheet.create({
  flexFill: {
    flex: 1,
  },
});
