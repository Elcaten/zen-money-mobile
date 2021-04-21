import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthToken} from './auth-token';
import {TOKEN_KEY} from './constants';

export const persistToken = async (token: AuthToken | null) => {
  if (token) {
    await AsyncStorage.setItem(TOKEN_KEY, JSON.stringify(token));
  } else {
    await AsyncStorage.removeItem(TOKEN_KEY);
  }
};
