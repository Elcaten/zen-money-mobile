import * as React from 'react';
import {StyleSheet} from 'react-native';
import {TextProps} from 'react-native-elements';
import {GRAY} from '../../constants/Colors';
import {Text} from '../Text';

export type CardTitleProps = TextProps;

export const CardTitle: React.FC<CardTitleProps> = (props) => {
  return <Text {...props} style={[styles.text, props.style]} />;
};

const styles = StyleSheet.create({
  text: {
    color: GRAY,
  },
});
