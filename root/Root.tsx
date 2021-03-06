import {StatusBar} from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import {useMe} from '../api-hooks';
import useColorScheme from '../hooks/useColorSheme';
import {useLocalAuthentication} from '../hooks/useLocalAuthentication';
import {initI18n} from '../init-i18n';
import Navigation from '../navigation';
import {useStore} from '../store/use-store';
import {
  DarkElementsTheme,
  DarkNavigatorTheme,
  DefaultElementsTheme,
  DefaultNavigatorTheme,
  useElementsTheme,
  useNavigatorThemeColors,
  useSetNavigatorTheme,
} from '../themes';
import {LoadingScreen} from './LoadingScreen';
import {LoginScreen} from './LoginScreen';
import {UnlockScreen} from './UnlockScreen';

export const Root: React.FC = () => {
  const {isLoading: isLoadingUser, isSuccess, data: user} = useMe();
  const isLoggedIn = isSuccess && user != null;

  const [isLoadingLocales, setIsLoadingLocales] = useState(true);
  const locale = useStore.use.locale();
  useEffect(() => {
    initI18n(locale).then(() => setIsLoadingLocales(false));
  }, [locale]);

  const appTheme = useStore.use.theme();
  const systemTheme = useColorScheme();
  const setNavigatorTheme = useSetNavigatorTheme();
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

  const {card} = useNavigatorThemeColors();

  const {isAuthenticated, showAuthPopup} = useLocalAuthentication();

  if (isLoadingUser || isLoadingLocales) {
    return <LoadingScreen />;
  }

  // It's crucial that components using `useTranslation` (like UnlockScreen) were rendered AFTER initI18n completes.
  // Ignoring that will cause misleading `React has detected a change in the order of Hooks` error to appear.
  // https://github.com/i18next/react-i18next/issues/960
  if (!isAuthenticated) {
    return <UnlockScreen onUnlockPress={showAuthPopup} />;
  }

  if (isLoggedIn) {
    return (
      <React.Fragment>
        <Navigation />
        <StatusBar backgroundColor={card} />
      </React.Fragment>
    );
  }

  return <LoginScreen />;
};
