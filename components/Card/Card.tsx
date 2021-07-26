import * as React from 'react';
import {useNavigatorThemeColors} from '../../themes';
import {View, ViewProps} from '../View';
import {CardTitle} from './CardTitle';

export type CardProps = ViewProps;

const CardComponent: React.FC<CardProps> = (props) => {
  const {card} = useNavigatorThemeColors();
  return <View {...props} style={[{backgroundColor: card}, props.style]} />;
};

export const Card = Object.assign(CardComponent, {
  Title: CardTitle,
});
