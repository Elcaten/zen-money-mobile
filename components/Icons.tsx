import React from 'react';
import {MaterialCommunityIcons, MaterialIcons} from '@expo/vector-icons';
import {IconProps as ExpoIconProps} from '@expo/vector-icons/build/createIconSet';
import {useNavigatorThemeColors} from '../themes';

export type IconProps = Omit<ExpoIconProps<string>, 'name'>;

export const BankIcon: React.FC<IconProps> = (props) => {
  const {iconColor} = useNavigatorThemeColors();
  return <MaterialCommunityIcons color={iconColor} name="bank" {...props} />;
};

export const CreditCardIcon: React.FC<IconProps> = (props) => {
  const {iconColor} = useNavigatorThemeColors();
  return <MaterialIcons color={iconColor} name="credit-card" {...props} />;
};

export const HelpIcon: React.FC<IconProps> = (props) => {
  const {iconColor} = useNavigatorThemeColors();
  return <MaterialIcons color={iconColor} name="help-outline" {...props} />;
};

export const LogoutIcon: React.FC<IconProps> = (props) => {
  const {iconColor} = useNavigatorThemeColors();
  return <MaterialIcons color={iconColor} name="logout" {...props} />;
};

export const MenuIcon: React.FC<IconProps> = (props) => {
  const {iconColor} = useNavigatorThemeColors();
  return <MaterialIcons color={iconColor} name="menu" {...props} />;
};

export const MinusIcon: React.FC<IconProps> = (props) => {
  const {iconColor} = useNavigatorThemeColors();
  return <MaterialCommunityIcons color={iconColor} name="minus" {...props} />;
};

export const PlusIcon: React.FC<IconProps> = (props) => {
  const {iconColor} = useNavigatorThemeColors();
  return <MaterialCommunityIcons color={iconColor} name="plus" {...props} />;
};

export const RadioboxBlankIcon: React.FC<IconProps> = (props) => {
  const {iconColor} = useNavigatorThemeColors();
  return <MaterialCommunityIcons color={iconColor} name="radiobox-blank" {...props} />;
};

export const RadioboxMarkedIcon: React.FC<IconProps> = (props) => {
  const {iconColor} = useNavigatorThemeColors();
  return <MaterialCommunityIcons color={iconColor} name="radiobox-marked" {...props} />;
};

export const ShowChartIcon: React.FC<IconProps> = (props) => {
  const {iconColor} = useNavigatorThemeColors();
  return <MaterialIcons color={iconColor} name="show-chart" {...props} />;
};

export const SubdirArrowRightIcon: React.FC<IconProps> = (props) => {
  const {iconColor} = useNavigatorThemeColors();
  return <MaterialCommunityIcons color={iconColor} name="subdirectory-arrow-right" {...props} />;
};

export const SwapHorizIcon: React.FC<IconProps> = (props) => {
  const {iconColor} = useNavigatorThemeColors();
  return <MaterialIcons color={iconColor} name="swap-horiz" {...props} />;
};

export const TagIcon: React.FC<IconProps> = (props) => {
  const {iconColor} = useNavigatorThemeColors();
  return <MaterialCommunityIcons color={iconColor} name="tag-outline" {...props} />;
};

export const ThemeIcon: React.FC<IconProps> = (props) => {
  const {iconColor} = useNavigatorThemeColors();
  return <MaterialCommunityIcons color={iconColor} name="theme-light-dark" {...props} />;
};

export const WalletIcon: React.FC<IconProps> = (props) => {
  const {iconColor} = useNavigatorThemeColors();
  return <MaterialCommunityIcons color={iconColor} name="wallet-outline" {...props} />;
};
