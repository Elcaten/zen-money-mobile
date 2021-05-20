import AsyncStorage from '@react-native-async-storage/async-storage';
import {PERSISIT_TOKEN_KEY} from '../utils';
import {AuthToken} from './auth-token';

export const persistToken = async (token: AuthToken | null) => {
  if (token) {
    await AsyncStorage.setItem(PERSISIT_TOKEN_KEY, JSON.stringify(token));
  } else {
    await AsyncStorage.removeItem(PERSISIT_TOKEN_KEY);
  }
};
