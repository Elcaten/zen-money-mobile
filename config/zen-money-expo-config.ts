import {ExpoConfig} from '@expo/config';

export interface ExtraConfig {
  PERSISIT_TOKEN_KEY: string;
  CLIENT_ID: string;
  REDIRECT_URL: string;
  AUTH_URL: string;
  TOKEN_URL: string;
  REFRESH_TOKEN_URL: string;
  API_URL: string;
  USE_PROXY: boolean;
}

export interface ZenMoneyExpoConfig extends ExpoConfig {
  extra: ExtraConfig;
}
