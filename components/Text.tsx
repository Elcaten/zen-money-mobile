import * as React from 'react';
import {TextProps as RNTextProps} from 'react-native-elements';
import {useNavigatorThemeColors} from '../themes';
import {Text as RNEText} from 'react-native-elements';
import {exhaustiveCheck} from '../utils/exhaustive-check';
import {useMemo} from 'react';

export type TextProps = RNTextProps & {
  size?: 'tiny' | 'small' | 'medium' | 'large' | 'giant';
};

export const Text: React.FC<TextProps> = (props) => {
  const {text} = useNavigatorThemeColors();
  const baseStyles = useMemo(() => {
    return {color: text, fontSize: getFontSize(props.size)};
  }, [props.size, text]);
  return <RNEText {...props} style={[baseStyles, props.style]} />;
};

function getFontSize(size?: 'tiny' | 'small' | 'medium' | 'large' | 'giant') {
  switch (size) {
    case 'tiny':
      return 12;
    case 'small':
      return 14;
    case undefined:
    case 'medium':
      return 16;
    case 'large':
      return 18;
    case 'giant':
      return 20;
    default:
      exhaustiveCheck(size);
  }
}
