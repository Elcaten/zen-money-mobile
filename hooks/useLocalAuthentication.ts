import AsyncStorage from '@react-native-async-storage/async-storage';
import * as LocalAuthentication from 'expo-local-authentication';
import {useCallback, useEffect, useState} from 'react';
import {AppState} from 'react-native';
import {useStore} from '../store/use-store';
import {LAST_FOREGROUND_TIMESTAMP_PERSIST_KEY, LOCK_SCREEN_TIMEOUT} from '../utils';

export const useLocalAuthentication = () => {
  const biometricUnlockEnabled = useStore.use.biometricUnlock();
  const authExpired = useAuthExpired(LOCK_SCREEN_TIMEOUT);

  const [isAuthenticated, setIsAuthorized] = useState(
    !biometricUnlockEnabled || (biometricUnlockEnabled && authExpired),
  );

  const showAuthPopup = useCallback(() => {
    LocalAuthentication.authenticateAsync().then(({success}) => {
      if (success) {
        setIsAuthorized(true);
      }
    });
  }, []);

  useEffect(() => {
    if (biometricUnlockEnabled && authExpired) {
      setIsAuthorized(false);
      showAuthPopup();
    }
  }, [authExpired, showAuthPopup, biometricUnlockEnabled]);

  return {isAuthenticated, showAuthPopup};
};

const useAuthExpired = (timeout: number) => {
  const [authExpired, setAuthExpired] = useState(true);

  useEffect(() => {
    const onAppStateChange = async (state: any) => {
      const storedValue = await AsyncStorage.getItem(LAST_FOREGROUND_TIMESTAMP_PERSIST_KEY);
      const lastTimestamp = isNaN(Number(storedValue)) ? 0 : Number(storedValue);

      if (state === 'background') {
        await AsyncStorage.setItem(LAST_FOREGROUND_TIMESTAMP_PERSIST_KEY, Date.now().toString());
      } else if (state === 'active') {
        setAuthExpired(Date.now() - lastTimestamp > timeout);
      }
    };
    AppState.addEventListener('change', onAppStateChange);

    return () => AppState.removeEventListener('change', onAppStateChange);
  }, [timeout]);

  return authExpired;
};
