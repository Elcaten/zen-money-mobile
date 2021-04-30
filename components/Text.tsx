import * as React from 'react';
import {TextProps} from 'react-native-elements';
import {useNavigatorThemeColors} from '../themes';
import {Text as RNEText} from 'react-native-elements';

export const Text: React.FC<TextProps> = (props) => {
  const {text} = useNavigatorThemeColors();
  return <RNEText {...props} style={[{color: text, fontSize: 16}, props.style]} />;
};
