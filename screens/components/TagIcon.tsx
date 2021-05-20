/* eslint-disable no-bitwise */
import React from 'react';
import {Image, ImageStyle, StyleProp, View, ViewStyle} from 'react-native';
import {TagIconName} from '../../api/models';
import {argbToHEX, pngIcons} from '../../utils';
import {SvgIcon} from './SvgIcon';

export interface TagIconProps {
  icon?: TagIconName | null;
  size?: number;
  color?: number | null;
  style?: StyleProp<ImageStyle> & StyleProp<ViewStyle>;
}

export const TagIcon: React.FC<TagIconProps> = ({icon, size, color, style}) => {
  if (!icon) {
    return <View style={{width: size}} />;
  }

  if (pngIcons[icon]) {
    return <Image source={pngIcons[icon]} style={[{width: size, height: size, tintColor: argbToHEX(color!)}, style]} />;
  } else {
    return (
      <SvgIcon
        icon={icon}
        width={size}
        height={size}
        color={argbToHEX(color!)}
        stroke={argbToHEX(color!)}
        strokeWidth={1}
        strokeOpacity={1}
        style={style}
      />
    );
  }
};

TagIcon.defaultProps = {
  size: 48,
  color: 10855845, // 165,165,165
};
