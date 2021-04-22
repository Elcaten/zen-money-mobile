import React from 'react';
import {MaterialCommunityIcons, MaterialIcons} from '@expo/vector-icons';
import {IconProps as ExpoIconProps} from '@expo/vector-icons/build/createIconSet';

export type IconProps = Omit<ExpoIconProps<string>, 'name'>;

export const BankIcon: React.FC<IconProps> = (props) => {
  return <MaterialCommunityIcons {...props} name="bank" />;
};

export const HelpIcon: React.FC<IconProps> = (props) => {
  return <MaterialIcons {...props} name="help-outline" />;
};

export const WalletIcon: React.FC<IconProps> = (props) => {
  return <MaterialCommunityIcons {...props} name="wallet-outline" />;
};
