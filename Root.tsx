import {StatusBar} from 'expo-status-bar';
import React, {useCallback, useEffect, useState} from 'react';
import {Appearance, Text} from 'react-native';
import {useMe} from './api-hooks';
import {LoginScreen} from './components/LoginScreen';
import {initI18n} from './init-i18n';
import Navigation from './navigation';
import {useStore} from './store/use-store';
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
  const locale = useStore((x) => x.locale);
  useEffect(() => {
    initI18n(locale).then(() => setIsLoadingLocales(false));
  }, [locale]);

  const theme = useStore((x) => x.theme);
  const {setNavigatorTheme} = useNavigatorTheme();
  const {setElementsTheme} = useElementsTheme();

  const setComponentThemes = useCallback(
    (colorScheme: 'dark' | 'light' | null | undefined) => {
      if (colorScheme === 'dark') {
        setNavigatorTheme(DarkNavigatorTheme);
        setElementsTheme(DarkElementsTheme);
      } else {
        setNavigatorTheme(DefaultNavigatorTheme);
        setElementsTheme(DefaultElementsTheme);
      }
    },
    [setElementsTheme, setNavigatorTheme],
  );

  useEffect(() => {
    const onSystemThemeChange = ({colorScheme}: {colorScheme?: 'light' | 'dark' | null}) => {
      if (theme === 'system') {
        setComponentThemes(colorScheme);
      }
    };
    Appearance.addChangeListener(onSystemThemeChange);
    setComponentThemes(Appearance.getColorScheme());
    return () => Appearance.removeChangeListener(onSystemThemeChange);
  }, [setComponentThemes, theme]);

  useEffect(() => {
    if (theme !== 'system') {
      setComponentThemes(theme);
    }
  }, [setComponentThemes, theme]);

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

  return <LoginScreen />;
};
