import * as React from 'react';
import {StyleSheet} from 'react-native';
import {TextProps} from 'react-native-elements';
import {useNavigatorThemeColors} from '../../themes';
import {ZenText} from '../ZenText';

export type CardTitleProps = TextProps;

export const CardTitle: React.FC<CardTitleProps> = (props) => {
  const {secondaryText} = useNavigatorThemeColors();
  return <ZenText {...props} style={[styles.text, {color: secondaryText}, props.style]} />;
};

const styles = StyleSheet.create({
  text: {
    margin: 16,
  },
});
