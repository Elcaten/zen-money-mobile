import Constants from 'expo-constants';
import {ExtraConfig} from '../config/zen-money-expo-config';

export const {
  API_URL,
  AUTH_URL,
  CLIENT_ID,
  PERSISIT_TOKEN_KEY,
  REDIRECT_URL,
  REFRESH_TOKEN_URL,
  TOKEN_URL,
  USE_PROXY,
} = Constants.manifest.extra as ExtraConfig;
