import * as React from 'react';
import {useMemo} from 'react';
import {StyleProp, TextStyle} from 'react-native';
import {Text as RNEText, TextProps as RNTextProps} from 'react-native-elements';
import {useNavigatorThemeColors} from '../../themes';
import {FontSize, getFontSize} from '../../utils';

export type ZenTextProps = RNTextProps & {
  size?: FontSize;
};

export const ZenText: React.FC<ZenTextProps> = (props) => {
  const {text} = useNavigatorThemeColors();

  const baseStyles = useMemo<StyleProp<TextStyle>>(() => {
    return {color: text, fontSize: getFontSize(props.size)};
  }, [props.size, text]);

  return <RNEText {...props} style={[baseStyles, props.style]} />;
};
