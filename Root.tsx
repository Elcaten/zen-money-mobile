import {StatusBar} from 'expo-status-bar';
import React from 'react';
import {Button, Text} from 'react-native';
import {login} from './auth';
import useColorScheme from './hooks/useColorScheme';
import {useMe} from './api-hooks';
import Navigation from './navigation';

export const Root: React.FC = () => {
  const colorScheme = useColorScheme();

  const {isLoading, isSuccess, data: user} = useMe();
  const isLoggedIn = isSuccess && user != undefined;

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (isLoggedIn) {
    return (
      <React.Fragment>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </React.Fragment>
    );
  }

  return <Button title="Login" onPress={login} />;
};
