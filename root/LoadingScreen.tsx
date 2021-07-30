import * as React from 'react';
import {StyleSheet} from 'react-native';
import {View} from '../components';
import {Card} from '../components/Card';
import {Logo} from '../components/Logo';

export interface LoadingScreenProps {}

export const LoadingScreen: React.FC<LoadingScreenProps> = (props) => {
  return (
    <Card style={styles.container}>
      <View style={styles.logoContainer}>
        <Logo style={styles.logo} />
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    textAlign: 'center',
    padding: 16,
  },
  logoContainer: {
    alignSelf: 'center',
    marginHorizontal: 120,
    marginVertical: 16,
  },
  logo: {
    width: '100%',
    height: undefined,
    aspectRatio: 1,
  },
});
