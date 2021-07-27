import {FontAwesome5, Ionicons, MaterialCommunityIcons, MaterialIcons} from '@expo/vector-icons';
import {IconProps as ExpoIconProps} from '@expo/vector-icons/build/createIconSet';
import React from 'react';
import {useNavigatorTheme} from '../themes';

export type IconProps = Omit<ExpoIconProps<string>, 'name'>;

export const ArrowBackIcon: React.FC<IconProps> = (props) => {
  const {colors, Icon} = useNavigatorTheme();
  return <MaterialIcons color={colors.iconColor} name="arrow-back" size={Icon.size} {...props} />;
};

export const BankIcon: React.FC<IconProps> = (props) => {
  const {colors, Icon} = useNavigatorTheme();
  return <MaterialCommunityIcons color={colors.iconColor} name="bank" size={Icon.size} {...props} />;
};

export const CalendarIcon: React.FC<IconProps> = (props) => {
  const {colors, Icon} = useNavigatorTheme();
  return <MaterialCommunityIcons color={colors.iconColor} name="calendar" size={Icon.size} {...props} />;
};

export const CheckIcon: React.FC<IconProps> = (props) => {
  const {colors, Icon} = useNavigatorTheme();
  return <MaterialIcons color={colors.iconColor} name="check" size={Icon.size} {...props} />;
};

export const CoinsIcon: React.FC<IconProps> = (props) => {
  const {colors, Icon} = useNavigatorTheme();
  return <FontAwesome5 color={colors.iconColor} name="coins" size={Icon.size} {...props} />;
};

export const CreditCardIcon: React.FC<IconProps> = (props) => {
  const {colors, Icon} = useNavigatorTheme();
  return <MaterialIcons color={colors.iconColor} name="credit-card" size={Icon.size} {...props} />;
};

export const CloseIcon: React.FC<IconProps> = (props) => {
  const {colors, Icon} = useNavigatorTheme();
  return <MaterialIcons color={colors.iconColor} name="close" size={Icon.size} {...props} />;
};

export const CommentIcon: React.FC<IconProps> = (props) => {
  const {colors, Icon} = useNavigatorTheme();
  return <MaterialCommunityIcons color={colors.iconColor} name="comment" size={Icon.size} {...props} />;
};

export const FingerprintIcon: React.FC<IconProps> = (props) => {
  const {colors, Icon} = useNavigatorTheme();
  return <MaterialIcons color={colors.iconColor} name="fingerprint" size={Icon.size} {...props} />;
};

export const HelpIcon: React.FC<IconProps> = (props) => {
  const {colors, Icon} = useNavigatorTheme();
  return <MaterialIcons color={colors.iconColor} name="help-outline" size={Icon.size} {...props} />;
};

export const LanguageIcon: React.FC<IconProps> = (props) => {
  const {colors, Icon} = useNavigatorTheme();
  return <MaterialIcons color={colors.iconColor} name="language" size={Icon.size} {...props} />;
};

export const LogoutIcon: React.FC<IconProps> = (props) => {
  const {colors, Icon} = useNavigatorTheme();
  return <MaterialIcons color={colors.iconColor} name="logout" size={Icon.size} {...props} />;
};

export const MenuIcon: React.FC<IconProps> = (props) => {
  const {colors, Icon} = useNavigatorTheme();
  return <MaterialIcons color={colors.iconColor} name="menu" size={Icon.size} {...props} />;
};

export const MinusIcon: React.FC<IconProps> = (props) => {
  const {colors, Icon} = useNavigatorTheme();
  return <MaterialCommunityIcons color={colors.iconColor} name="minus" size={Icon.size} {...props} />;
};

export const MinusBoxOutlineIcon: React.FC<IconProps> = (props) => {
  const {colors, Icon} = useNavigatorTheme();
  return <MaterialCommunityIcons color={colors.iconColor} name="minus-box-outline" size={Icon.size} {...props} />;
};

export const MoneyIcon: React.FC<IconProps> = (props) => {
  const {colors, Icon} = useNavigatorTheme();
  return <MaterialIcons color={colors.iconColor} name="attach-money" size={Icon.size} {...props} />;
};

export const PieChartIcon: React.FC<IconProps> = (props) => {
  const {colors, Icon} = useNavigatorTheme();
  return <Ionicons color={colors.iconColor} name="pie-chart-outline" size={Icon.size} {...props} />;
};

export const PlusIcon: React.FC<IconProps> = (props) => {
  const {colors, Icon} = useNavigatorTheme();
  return <MaterialCommunityIcons color={colors.iconColor} name="plus" size={Icon.size} {...props} />;
};

export const PlusCircleOutlineIcon: React.FC<IconProps> = (props) => {
  const {colors, Icon} = useNavigatorTheme();
  return <MaterialCommunityIcons color={colors.iconColor} name="plus-circle-outline" size={Icon.size} {...props} />;
};

export const PlusBoxOutlineIcon: React.FC<IconProps> = (props) => {
  const {colors, Icon} = useNavigatorTheme();
  return <MaterialCommunityIcons color={colors.iconColor} name="plus-box-outline" size={Icon.size} {...props} />;
};

export const QuestionCircleIcon: React.FC<IconProps> = (props) => {
  const {colors, Icon} = useNavigatorTheme();
  return <FontAwesome5 color={colors.iconColor} name="question-circle" size={Icon.size} {...props} />;
};

export const RadioboxBlankIcon: React.FC<IconProps> = (props) => {
  const {colors, Icon} = useNavigatorTheme();
  return <MaterialCommunityIcons color={colors.iconColor} name="radiobox-blank" size={Icon.size} {...props} />;
};

export const RadioboxMarkedIcon: React.FC<IconProps> = (props) => {
  const {colors, Icon} = useNavigatorTheme();
  return <MaterialCommunityIcons color={colors.iconColor} name="radiobox-marked" size={Icon.size} {...props} />;
};

export const SearchIcon: React.FC<IconProps> = (props) => {
  const {colors, Icon} = useNavigatorTheme();
  return <MaterialIcons color={colors.iconColor} name="search" size={Icon.size} {...props} />;
};

export const ShowChartIcon: React.FC<IconProps> = (props) => {
  const {colors, Icon} = useNavigatorTheme();
  return <MaterialIcons color={colors.iconColor} name="show-chart" size={Icon.size} {...props} />;
};

export const SubdirArrowRightIcon: React.FC<IconProps> = (props) => {
  const {colors, Icon} = useNavigatorTheme();
  return (
    <MaterialCommunityIcons color={colors.iconColor} name="subdirectory-arrow-right" size={Icon.size} {...props} />
  );
};

export const SwapHorizIcon: React.FC<IconProps> = (props) => {
  const {colors, Icon} = useNavigatorTheme();
  return <MaterialIcons color={colors.iconColor} name="swap-horiz" size={Icon.size} {...props} />;
};

export const TagIcon: React.FC<IconProps> = (props) => {
  const {colors, Icon} = useNavigatorTheme();
  return <MaterialCommunityIcons color={colors.iconColor} name="tag-outline" size={Icon.size} {...props} />;
};

export const ThemeIcon: React.FC<IconProps> = (props) => {
  const {colors, Icon} = useNavigatorTheme();
  return <MaterialCommunityIcons color={colors.iconColor} name="theme-light-dark" size={Icon.size} {...props} />;
};

export const WalletIcon: React.FC<IconProps> = (props) => {
  const {colors, Icon} = useNavigatorTheme();
  return <MaterialCommunityIcons color={colors.iconColor} name="wallet-outline" size={Icon.size} {...props} />;
};
