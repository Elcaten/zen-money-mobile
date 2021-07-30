import React from 'react';
import {Image, ImageStyle, StyleProp} from 'react-native';

export interface LogoProps {
  style?: StyleProp<ImageStyle>;
}

export const Logo: React.FC<LogoProps> = ({style}) => {
  return <Image source={require('../assets/images/icon.png')} style={style} />;
};
