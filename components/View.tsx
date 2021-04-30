import * as React from 'react';
import {View as RNView, ViewProps} from 'react-native';
import {useNavigatorThemeColors} from '../themes';

export const View: React.FC<ViewProps> = (props) => {
  const {card} = useNavigatorThemeColors();
  return <RNView {...props} style={[{backgroundColor: card}, props.style]} />;
};
