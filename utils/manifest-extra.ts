import Constants from 'expo-constants';
import {ZenMoneyExpoConfig} from '../app.config';

export const {
  API_TOKEN_PERISIT_KEY,
  API_URL,
  AUTH_URL,
  BUGSNAG_API_KEY,
  CLIENT_ID,
  DEMO_TOKEN,
  LAST_FOREGROUND_TIMESTAMP_PERSIST_KEY,
  LOCK_SCREEN_TIMEOUT,
  REACT_QUERY_PERSIST_KEY,
  REDIRECT_URL,
} = Constants.manifest.extra as ZenMoneyExpoConfig;
