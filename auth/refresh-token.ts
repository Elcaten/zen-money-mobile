// import ky from 'ky';
// import {REFRESH_TOKEN_URL} from '../utils';
// import {AuthResonse, validateAuthTokenResponse} from './auth-response';
// import {AuthToken} from './auth-token';

// export const refreshToken = async (token: AuthToken) => {
//   const refreshUrl = REFRESH_TOKEN_URL + token.refreshToken;
//   const refreshResponse = await ky.get(refreshUrl).json<AuthResonse>();
//   validateAuthTokenResponse(refreshResponse);
//   return new AuthToken(refreshResponse);
// };

//TODO: Zen Money API token never expires
