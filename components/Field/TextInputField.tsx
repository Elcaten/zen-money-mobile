import React, {forwardRef, useImperativeHandle, useRef} from 'react';
import {StyleSheet} from 'react-native';
import {ListItem} from '../ListItem';
import {ZenTextInput} from '../ZenTextInput';
import {ZenTextInputHandles} from '../ZenTextInput/ZenTextInput';

export interface TextInputFieldHandle {
  shake: () => void;
}

export interface TextInputFieldProps {
  secureTextEntry?: boolean;
  leftIcon?: () => JSX.Element;
  placeholder: string;
  field: {
    onChange: (...event: any[]) => void;
    onBlur: () => void;
    value: string | null;
  };
}

const TextInputFieldComponent: React.ForwardRefRenderFunction<TextInputFieldHandle, TextInputFieldProps> = (
  {field: {onChange, onBlur, value}, placeholder, leftIcon, secureTextEntry},
  ref,
) => {
  const inputRef = useRef<ZenTextInputHandles>(null);

  useImperativeHandle(ref, () => ({shake: () => inputRef.current?.shake()}), []);

  return (
    <ListItem bottomDivider>
      {leftIcon && leftIcon()}
      <ZenTextInput
        ref={inputRef}
        secureTextEntry={secureTextEntry}
        placeholder={placeholder}
        value={value ?? ''}
        onChangeText={onChange}
        onBlur={onBlur}
        containerStyle={styles.flexFill}
        style={styles.flexFill}
      />
    </ListItem>
  );
};

const styles = StyleSheet.create({
  flexFill: {
    flex: 1,
  },
});

export const TextInputField = forwardRef(TextInputFieldComponent);
