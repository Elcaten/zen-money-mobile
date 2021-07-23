import * as React from 'react';
import {useMemo} from 'react';
import {Text as RNEText, TextProps as RNTextProps} from 'react-native-elements';
import {useNavigatorThemeColors} from '../themes';
import {FontSize, getFontSize} from '../utils';

export type TextProps = RNTextProps & {
  size?: FontSize;
};

export const Text: React.FC<TextProps> = (props) => {
  const {text} = useNavigatorThemeColors();
  const baseStyles = useMemo(() => {
    return {color: text, fontSize: getFontSize(props.size)};
  }, [props.size, text]);
  return <RNEText {...props} style={[baseStyles, props.style]} />;
};
