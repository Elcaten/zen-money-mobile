import * as React from 'react';
import {Input as RNEInput, InputProps} from 'react-native-elements';

export const Input: React.FC<InputProps> = (props) => {
  return <RNEInput {...props} />;
};
