import AsyncStorage from '@react-native-async-storage/async-storage';
import {useState, useEffect, useCallback} from 'react';
import {AppState} from 'react-native';
import {useStore, biometricUnlockSelector} from '../store/use-store';
import {LOCK_SCREEN_TIMEOUT, PERSIST_LAST_TIMESTAMP_KEY} from '../utils';
import * as LocalAuthentication from 'expo-local-authentication';

export const useLocalAuthentication = () => {
  const biometricUnlockEnabled = useStore(biometricUnlockSelector);
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
      const storedValue = await AsyncStorage.getItem(PERSIST_LAST_TIMESTAMP_KEY);
      const lastTimestamp = isNaN(Number(storedValue)) ? 0 : Number(storedValue);

      if (state === 'background') {
        await AsyncStorage.setItem(PERSIST_LAST_TIMESTAMP_KEY, Date.now().toString());
      } else if (state === 'active') {
        setAuthExpired(Date.now() - lastTimestamp > timeout);
      }
    };
    AppState.addEventListener('change', onAppStateChange);

    return () => AppState.removeEventListener('change', onAppStateChange);
  }, [timeout]);

  return authExpired;
};
