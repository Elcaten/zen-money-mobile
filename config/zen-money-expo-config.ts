import {ExpoConfig} from '@expo/config';

export interface ExtraConfig {
  REACT_QUERY_PERSIST_KEY: string;
  PERSISIT_TOKEN_KEY: string;
  CLIENT_ID: string;
  REDIRECT_URL: string;
  AUTH_URL: string;
  TOKEN_URL: string;
  REFRESH_TOKEN_URL: string;
  API_URL: string;
  USE_PROXY: boolean;
  DEMO_TOKEN: string;
}

export interface ZenMoneyExpoConfig extends ExpoConfig {
  extra: ExtraConfig;
}
