import * as React from 'react';
import {StyleSheet, View as RNView, ViewProps as RNViewProps} from 'react-native';

export interface ViewProps extends RNViewProps {
  disabled?: boolean;
}

export const View: React.FC<ViewProps> = ({disabled, ...rest}) => {
  const baseStyles = disabled ? styles.disabledView : {};
  return (
    <RNView {...rest} style={StyleSheet.flatten([baseStyles, rest.style])} pointerEvents={disabled ? 'none' : 'auto'} />
  );
};

const styles = StyleSheet.create({
  disabledView: {
    opacity: 0.5,
  },
});
