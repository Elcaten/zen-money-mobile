import {StatusBar} from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import {Button, Text} from 'react-native';
import {useMe} from './api-hooks';
import {login} from './auth';
import {initI18n} from './init-i18n';
import Navigation from './navigation';
import {useStore} from './store/use-store';

export const Root: React.FC = () => {
  const {isLoading, isSuccess, data: user} = useMe();
  const isLoggedIn = isSuccess && user != undefined;

  const [isLoadingLocales, setIsLoadingLocales] = useState(true);
  const locale = useStore((x) => x.locale);
  useEffect(() => {
    initI18n(locale).then(() => setIsLoadingLocales(false));
  }, [locale]);

  if (isLoading || isLoadingLocales) {
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
