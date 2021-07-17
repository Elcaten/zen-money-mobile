import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from '../../../components';

export interface SyncScreenProps {}

export const SyncScreen: React.FC<SyncScreenProps> = (props) => {
  return (
    <View style={styles.wrapper}>
      <Text>SyncScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
});
