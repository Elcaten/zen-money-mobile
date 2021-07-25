import {StatusBar} from 'expo-status-bar';
import React, {useCallback, useEffect, useState} from 'react';
import {useMe} from './api-hooks';
import {LoadingScreen} from './components/LoadingScreen';
import {LoginScreen} from './components/LoginScreen';
import useColorScheme from './hooks/useColorSheme';
import {initI18n} from './init-i18n';
import Navigation from './navigation';
import {localeSelector, themeSelector, useStore} from './store/use-store';
import {
  DarkElementsTheme,
  DarkNavigatorTheme,
  DefaultElementsTheme,
  DefaultNavigatorTheme,
  useElementsTheme,
  useNavigatorTheme,
} from './themes';

export const Root: React.FC = () => {
  const {isLoading, isSuccess, data: user} = useMe();
  const isLoggedIn = isSuccess && user != null;

  const [isLoadingLocales, setIsLoadingLocales] = useState(true);
  const locale = useStore(localeSelector);
  useEffect(() => {
    initI18n(locale).then(() => setIsLoadingLocales(false));
  }, [locale]);

  const appTheme = useStore(themeSelector);
  const systemTheme = useColorScheme();
  const {setNavigatorTheme} = useNavigatorTheme();
  const {setElementsTheme} = useElementsTheme();

  useEffect(() => {
    const effectiveTheme = appTheme === 'system' ? systemTheme : appTheme;
    if (effectiveTheme === 'dark') {
      setNavigatorTheme(DarkNavigatorTheme);
      setElementsTheme(DarkElementsTheme);
    } else {
      setNavigatorTheme(DefaultNavigatorTheme);
      setElementsTheme(DefaultElementsTheme);
    }
  }, [setElementsTheme, setNavigatorTheme, systemTheme, appTheme]);

  if (isLoading || isLoadingLocales) {
    return <LoadingScreen />;
  }

  if (isLoggedIn) {
    return (
      <React.Fragment>
        <Navigation />
        <StatusBar />
      </React.Fragment>
    );
  }

  return <LoginScreen />;
};
