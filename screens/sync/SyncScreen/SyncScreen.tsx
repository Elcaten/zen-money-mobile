import React from 'react';
import {StyleSheet, View} from 'react-native';
import {ZenText} from '../../../components/ZenText';

export interface SyncScreenProps {}

export const SyncScreen: React.FC<SyncScreenProps> = (props) => {
  return (
    <View style={styles.wrapper}>
      <ZenText>SyncScreen</ZenText>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
});
