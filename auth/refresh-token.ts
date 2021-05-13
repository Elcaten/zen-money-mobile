import ky from 'ky';
import {manifestExtra} from '../utils/manifest-extra';
import {AuthResonse, validateAuthTokenResponse} from './auth-response';
import {AuthToken} from './auth-token';

export const refreshToken = async (token: AuthToken) => {
  const refreshUrl = manifestExtra.REFRESH_TOKEN_URL + token.refreshToken;
  const refreshResponse = await ky.get(refreshUrl).json<AuthResonse>();
  validateAuthTokenResponse(refreshResponse);
  return new AuthToken(refreshResponse);
};
