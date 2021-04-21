import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthToken} from './auth-token';
import {TOKEN_KEY} from './constants';

function validateToken(value: unknown): asserts value is AuthToken {
  const {accessToken, refreshToken, expires} = value as AuthToken;
  if (accessToken == null || refreshToken == null || expires == null) {
    throw new Error('Invalid stored token');
  }
}

export const pullTokenFromStorage = async () => {
  try {
    const fromStorage = await AsyncStorage.getItem(TOKEN_KEY);
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
