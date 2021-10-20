import * as React from 'react';
import {StyleSheet} from 'react-native';
import {View} from '../View';

export interface ZenFormSheetHeaderSpacerProps {}

export const ZenFormSheetHeaderSpacer: React.FC<ZenFormSheetHeaderSpacerProps> = () => {
  return <View style={styles.wrapper} />;
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
});
