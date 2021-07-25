import React from 'react';
import {FontAwesome5, Ionicons, MaterialCommunityIcons, MaterialIcons} from '@expo/vector-icons';
import {IconProps as ExpoIconProps} from '@expo/vector-icons/build/createIconSet';
import {useNavigatorThemeColors} from '../themes';

export type IconProps = Omit<ExpoIconProps<string>, 'name'>;

export const ArrowBackIcon: React.FC<IconProps> = (props) => {
  const {iconColor} = useNavigatorThemeColors();
  return <MaterialIcons color={iconColor} name="arrow-back" {...props} />;
};

export const BankIcon: React.FC<IconProps> = (props) => {
  const {iconColor} = useNavigatorThemeColors();
  return <MaterialCommunityIcons color={iconColor} name="bank" {...props} />;
};

export const CalendarIcon: React.FC<IconProps> = (props) => {
  const {iconColor} = useNavigatorThemeColors();
  return <MaterialCommunityIcons color={iconColor} name="calendar" {...props} />;
};

export const CheckIcon: React.FC<IconProps> = (props) => {
  const {iconColor} = useNavigatorThemeColors();
  return <MaterialIcons color={iconColor} name="check" {...props} />;
};

export const CoinsIcon: React.FC<IconProps> = (props) => {
  const {iconColor} = useNavigatorThemeColors();
  return <FontAwesome5 color={iconColor} name="coins" {...props} />;
};

export const CreditCardIcon: React.FC<IconProps> = (props) => {
  const {iconColor} = useNavigatorThemeColors();
  return <MaterialIcons color={iconColor} name="credit-card" {...props} />;
};

export const CloseIcon: React.FC<IconProps> = (props) => {
  const {iconColor} = useNavigatorThemeColors();
  return <MaterialIcons color={iconColor} name="close" {...props} />;
};

export const CommentIcon: React.FC<IconProps> = (props) => {
  const {iconColor} = useNavigatorThemeColors();
  return <MaterialCommunityIcons color={iconColor} name="comment" {...props} />;
};

export const HelpIcon: React.FC<IconProps> = (props) => {
  const {iconColor} = useNavigatorThemeColors();
  return <MaterialIcons color={iconColor} name="help-outline" {...props} />;
};

export const LanguageIcon: React.FC<IconProps> = (props) => {
  const {iconColor} = useNavigatorThemeColors();
  return <MaterialIcons color={iconColor} name="language" {...props} />;
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

export const MinusBoxOutlineIcon: React.FC<IconProps> = (props) => {
  const {iconColor} = useNavigatorThemeColors();
  return <MaterialCommunityIcons color={iconColor} name="minus-box-outline" {...props} />;
};

export const MoneyIcon: React.FC<IconProps> = (props) => {
  const {iconColor} = useNavigatorThemeColors();
  return <MaterialIcons color={iconColor} name="attach-money" {...props} />;
};

export const PieChartIcon: React.FC<IconProps> = (props) => {
  const {iconColor} = useNavigatorThemeColors();
  return <Ionicons color={iconColor} name="pie-chart-outline" {...props} />;
};

export const PlusIcon: React.FC<IconProps> = (props) => {
  const {iconColor} = useNavigatorThemeColors();
  return <MaterialCommunityIcons color={iconColor} name="plus" {...props} />;
};

export const PlusCircleOutlineIcon: React.FC<IconProps> = (props) => {
  const {iconColor} = useNavigatorThemeColors();
  return <MaterialCommunityIcons color={iconColor} name="plus-circle-outline" {...props} />;
};

export const PlusBoxOutlineIcon: React.FC<IconProps> = (props) => {
  const {iconColor} = useNavigatorThemeColors();
  return <MaterialCommunityIcons color={iconColor} name="plus-box-outline" {...props} />;
};

export const QuestionCircleIcon: React.FC<IconProps> = (props) => {
  const {iconColor} = useNavigatorThemeColors();
  return <FontAwesome5 color={iconColor} name="question-circle" {...props} />;
};

export const RadioboxBlankIcon: React.FC<IconProps> = (props) => {
  const {iconColor} = useNavigatorThemeColors();
  return <MaterialCommunityIcons color={iconColor} name="radiobox-blank" {...props} />;
};

export const RadioboxMarkedIcon: React.FC<IconProps> = (props) => {
  const {iconColor} = useNavigatorThemeColors();
  return <MaterialCommunityIcons color={iconColor} name="radiobox-marked" {...props} />;
};

export const SearchIcon: React.FC<IconProps> = (props) => {
  const {iconColor} = useNavigatorThemeColors();
  return <MaterialIcons color={iconColor} name="search" {...props} />;
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
