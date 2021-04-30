import * as React from 'react';
import {View, ViewProps} from 'react-native';
import {useNavigatorThemeColors} from '../../themes';
import {CardTitle} from './CardTitle';

export type CardProps = ViewProps;

const CardComponent: React.FC<CardProps> = (props) => {
  const {card} = useNavigatorThemeColors();
  return <View {...props} style={[{backgroundColor: card}, props.style]} />;
};

export const Card = Object.assign(CardComponent, {
  Title: CardTitle,
});
