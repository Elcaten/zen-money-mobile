import ky from 'ky';
import {persistToken, pullTokenFromStorage} from '../auth';
import {refreshToken} from '../auth/refresh-token';
import {API_URL} from '../utils/manifest-extra';

export const publicClient = ky.extend({
  prefixUrl: API_URL,
});

export const privateClient = publicClient.extend({
  hooks: {
    beforeRequest: [
      async () => {
        const token = await pullTokenFromStorage();

        if (token) {
          const isTokenExpired = token.expires < new Date().getTime();

          if (isTokenExpired) {
            const tokenData = await refreshToken(token);
            persistToken(tokenData);
          }
        }
      },
      async (request) => {
        const token = await pullTokenFromStorage();

        if (token) {
          request.headers.set('Authorization', `Bearer ${token.accessToken}`);
        }
      },
    ],
  },
});
