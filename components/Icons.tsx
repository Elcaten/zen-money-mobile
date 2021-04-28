import React from 'react';
import {MaterialCommunityIcons, MaterialIcons} from '@expo/vector-icons';
import {IconProps as ExpoIconProps} from '@expo/vector-icons/build/createIconSet';
import {useNavigatorThemeColors} from '../themes';

export type IconProps = Omit<ExpoIconProps<string>, 'name'>;

export const BankIcon: React.FC<IconProps> = (props) => {
  const {iconColor} = useNavigatorThemeColors();
  return <MaterialCommunityIcons color={iconColor} name="bank" {...props} />;
};

export const LogoutIcon: React.FC<IconProps> = (props) => {
  const {iconColor} = useNavigatorThemeColors();
  return <MaterialIcons color={iconColor} name="logout" {...props} />;
};

export const HelpIcon: React.FC<IconProps> = (props) => {
  const {iconColor} = useNavigatorThemeColors();
  return <MaterialIcons color={iconColor} name="help-outline" {...props} />;
};

export const TagIcon: React.FC<IconProps> = (props) => {
  const {iconColor} = useNavigatorThemeColors();
  return <MaterialCommunityIcons color={iconColor} name="tag-outline" {...props} />;
};

export const WalletIcon: React.FC<IconProps> = (props) => {
  const {iconColor} = useNavigatorThemeColors();
  return <MaterialCommunityIcons color={iconColor} name="wallet-outline" {...props} />;
};
