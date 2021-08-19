import Constants from 'expo-constants';
import {ZenMoneyExpoConfig} from '../app.config';

export const {
  REACT_QUERY_PERSIST_KEY,
  API_URL,
  AUTH_URL,
  CLIENT_ID,
  PERSISIT_TOKEN_KEY,
  PERSIST_LAST_TIMESTAMP_KEY,
  LOCK_SCREEN_TIMEOUT,
  REDIRECT_URL,
  REFRESH_TOKEN_URL,
  TOKEN_URL,
  DEMO_TOKEN,
  BUGSNAG_API_KEY,
} = Constants.manifest.extra as ZenMoneyExpoConfig;
