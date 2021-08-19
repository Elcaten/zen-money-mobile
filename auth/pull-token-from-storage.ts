import AsyncStorage from '@react-native-async-storage/async-storage';
import {API_TOKEN_PERISIT_KEY} from '../utils';
import {AuthToken} from './auth-token';

function validateToken(value: unknown): asserts value is AuthToken {
  const {accessToken, refreshToken, expires} = value as AuthToken;
  if (accessToken == null || refreshToken == null || expires == null) {
    throw new Error('Invalid stored token');
  }
}

export const pullTokenFromStorage = async () => {
  try {
    const fromStorage = await AsyncStorage.getItem(API_TOKEN_PERISIT_KEY);
    if (fromStorage) {
      const storedToken = JSON.parse(fromStorage);
      validateToken(storedToken);
      return storedToken;
    } else {
      return null;
    }
  } catch (err) {
    console.error(err);
    return null;
  }
};
