import * as React from 'react';
import {ScrollView as RNScrollView, ScrollViewProps as RNScrollViewProps, StyleSheet} from 'react-native';

export interface ScrollViewProps extends RNScrollViewProps {
  disabled?: boolean;
}

export const ScrollView: React.FC<ScrollViewProps> = ({disabled, ...rest}) => {
  const baseStyles = disabled ? styles.disabledScrollView : {};
  return (
    <RNScrollView
      {...rest}
      style={StyleSheet.flatten([baseStyles, rest.style])}
      pointerEvents={disabled ? 'none' : 'auto'}
    />
  );
};

const styles = StyleSheet.create({
  disabledScrollView: {
    opacity: 0.5,
  },
});
