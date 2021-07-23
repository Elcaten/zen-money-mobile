import React, {ReactNode} from 'react';
import {StyleSheet} from 'react-native';
import {ListItem} from '../ListItem';
import {ZenTextInput} from '../ZenTextInput';

export interface TextInputFieldProps {
  leftIcon?: () => JSX.Element;
  placeholder: string;
  field: {
    onChange: (...event: any[]) => void;
    onBlur: () => void;
    value: string | null;
  };
}

export const TextInputField: React.FC<TextInputFieldProps> = ({
  field: {onChange, onBlur, value},
  placeholder,
  leftIcon,
}) => {
  return (
    <ListItem bottomDivider>
      {leftIcon && leftIcon()}
      <ZenTextInput
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
