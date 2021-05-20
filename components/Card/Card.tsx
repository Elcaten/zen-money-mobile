import * as React from 'react';
import {StyleSheet, View, ViewProps} from 'react-native';
import {useNavigatorThemeColors} from '../../themes';
import {CardTitle} from './CardTitle';

export type CardProps = ViewProps;

const CardComponent: React.FC<CardProps> = (props) => {
  const {card} = useNavigatorThemeColors();
  return <View {...props} style={[{backgroundColor: card}, styles.title, props.style]} />;
};

export const Card = Object.assign(CardComponent, {
  Title: CardTitle,
});

const styles = StyleSheet.create({
  title: {
    padding: 16,
  },
});
