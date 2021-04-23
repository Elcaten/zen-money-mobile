import React from 'react';
import {Image, ImageStyle, StyleProp, ViewStyle} from 'react-native';
import {TagIconName} from '../../api/fetchTags';
import {HelpIcon} from '../../components/Icons';
import {SvgIcon} from './SvgIcon';
import {pngIcons} from '../../utils/png-icons';

export interface TagIconProps {
  icon?: TagIconName | null;
  size?: number;
  color?: string;
  style?: StyleProp<ImageStyle> & StyleProp<ViewStyle>;
}

export const TagIcon: React.FC<TagIconProps> = ({icon, size, color, style}) => {
  if (!icon) {
    return <HelpIcon />;
  }
  if (pngIcons[icon]) {
    return <Image source={pngIcons[icon]} style={[{width: size, height: size, tintColor: color}, style]} />;
  } else {
    return (
      <SvgIcon
        icon={icon}
        width={size}
        height={size}
        color={color}
        stroke={color}
        strokeWidth={1}
        strokeOpacity={1}
        style={style}
      />
    );
  }
};

TagIcon.defaultProps = {
  size: 48,
  color: 'black',
};
