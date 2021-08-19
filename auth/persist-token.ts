import AsyncStorage from '@react-native-async-storage/async-storage';
import {API_TOKEN_PERISIT_KEY} from '../utils';
import {AuthToken} from './auth-token';

export const persistToken = async (token: AuthToken | null) => {
  if (token) {
    await AsyncStorage.setItem(API_TOKEN_PERISIT_KEY, JSON.stringify(token));
  } else {
    await AsyncStorage.removeItem(API_TOKEN_PERISIT_KEY);
  }
};
