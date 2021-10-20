import * as React from 'react';
import {StyleSheet} from 'react-native';
import {View} from '../View';

export interface ZenFormSheetHeaderProps {}

export const ZenFormSheetHeader: React.FC<ZenFormSheetHeaderProps> = ({children}) => {
  return <View style={styles.header}>{children}</View>;
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    padding: 8,
    justifyContent: 'space-between',
  },
});
