import {StatusBar} from 'expo-status-bar';
import React from 'react';
import {Button, Text} from 'react-native';
import {useMe} from './api-hooks';
import {login} from './auth';
import Navigation from './navigation';

export const Root: React.FC = () => {
  const {isLoading, isSuccess, data: user} = useMe();
  const isLoggedIn = isSuccess && user != undefined;

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (isLoggedIn) {
    return (
      <React.Fragment>
        <Navigation />
        <StatusBar />
      </React.Fragment>
    );
  }

  return <Button title="Login" onPress={login} />;
};
