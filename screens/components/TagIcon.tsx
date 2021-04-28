/* eslint-disable no-bitwise */
import React from 'react';
import {Image, ImageStyle, StyleProp, View, ViewStyle} from 'react-native';
import {TagIconName} from '../../api/fetchTags';
import {HelpIcon} from '../../components/Icons';
import {SvgIcon} from './SvgIcon';
import {pngIcons} from '../../utils/png-icons';
import {Text} from '../../components';

const hexColorByArgb = new Map<number, string>();

function argbToHEX(color: number) {
  if (!hexColorByArgb.has(color)) {
    hexColorByArgb.set(color, '#' + ('000000' + (color & 0xffffff).toString(16)).slice(-6));
  }
  return hexColorByArgb.get(color);
}

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
