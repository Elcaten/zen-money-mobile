// WARNING THIS ISN'T VERSIONED
import {ConfigContext, ExpoConfig} from '@expo/config';
import dotenv from 'dotenv';
import {cleanEnv, EnvError, json, makeValidator, num, str} from 'envalid';
import path from 'path';

dotenv.config({path: path.resolve(__dirname, `./config/${process.env.ENVIRONMENT}.env`)});

const environmentValidator = makeValidator<'dev' | 'prod'>((value) => {
  if (value !== 'dev' && value !== 'prod') {
    throw new EnvError(`Value "${value}" not in choices [${['dev', 'prod']}]`);
  }
  return value as 'dev' | 'prod';
});

function getEnv() {
  return cleanEnv(process.env, {
    ENVIRONMENT: environmentValidator(),
    REACT_QUERY_PERSIST_KEY: str(),
    API_TOKEN_PERISIT_KEY: str(),
    LAST_FOREGROUND_TIMESTAMP_PERSIST_KEY: str(),
    LOCK_SCREEN_TIMEOUT: num(),
    CLIENT_ID: str(),
    REDIRECT_URL: str(),
    AUTH_URL: str(),
    API_URL: str(),
    DEMO_TOKEN: json(),
    BUGSNAG_API_KEY: str(),
  });
}

export type ZenMoneyExpoConfig = ReturnType<typeof getEnv>;

export default ({config}: ConfigContext): ExpoConfig => {
  return {
    ...(config as ExpoConfig),
    extra: getEnv(),
  };
};
