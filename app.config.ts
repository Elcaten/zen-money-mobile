// WARNING THIS ISN'T VERSIONED
import {ExpoConfig, ConfigContext} from '@expo/config';
import dotenv from 'dotenv';
import path from 'path';
import {ZenMoneyExpoConfig} from './config/zen-money-expo-config';

dotenv.config({path: path.resolve(__dirname, `./config/${process.env.ENVIRONMENT}.env`)});

export default ({config}: ConfigContext): ZenMoneyExpoConfig => {
  if (
    !process.env.ZEN_PERSISIT_TOKEN_KEY! ||
    !process.env.ZEN_CLIENT_ID! ||
    !process.env.ZEN_REDIRECT_URL ||
    !process.env.ZEN_AUTH_URL ||
    !process.env.ZEN_TOKEN_URL ||
    !process.env.ZEN_REFRESH_TOKEN_URL ||
    !process.env.ZEN_API_URL ||
    !process.env.ZEN_USE_PROXY
  ) {
    throw new Error(`Invalid process.env configuration:\n${JSON.stringify(process.env, null, 2)}`);
  }

  return {
    ...(config as ExpoConfig),
    extra: {
      PERSISIT_TOKEN_KEY: process.env.ZEN_PERSISIT_TOKEN_KEY,
      CLIENT_ID: process.env.ZEN_CLIENT_ID,
      REDIRECT_URL: process.env.ZEN_REDIRECT_URL,
      AUTH_URL: process.env.ZEN_AUTH_URL,
      TOKEN_URL: process.env.ZEN_TOKEN_URL,
      REFRESH_TOKEN_URL: process.env.ZEN_REFRESH_TOKEN_URL,
      API_URL: process.env.ZEN_API_URL,
      USE_PROXY: process.env.ZEN_USE_PROXY === 'true',
    },
  };
};