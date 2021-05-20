import * as React from 'react';
import {Text, View} from 'react-native';

export interface LoadingScreenProps {}

export const LoadingScreen: React.FC<LoadingScreenProps> = (props) => {
  return (
    <View style={styles.container}>
      <Text>Loading...</Text>
    </View>
  );
};

import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
