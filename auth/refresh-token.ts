import ky from 'ky';
import {AuthResonse, validateAuthTokenResponse} from './auth-response';
import {AuthToken} from './auth-token';
import {REFRESH_TOKEN_URL} from './constants';

export const refreshToken = async (token: AuthToken) => {
  const refreshResponse = await ky.get(REFRESH_TOKEN_URL(token.refreshToken)).json<AuthResonse>();
  validateAuthTokenResponse(refreshResponse);
  return new AuthToken(refreshResponse);
};
