import ky from 'ky';
import {persistToken, pullTokenFromStorage} from '../auth';
import {refreshToken} from '../auth/refresh-token';
import {bugsnag} from '../utils/bugsnag';
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
    afterResponse: [
      async (req, opt, resp) => {
        if (!resp.ok) {
          bugsnag.notify(
            {
              name: `Network error ${resp.status}`,
              message: await resp.text(),
            },
            (event) =>
              event.addMetadata('Details', {
                request: JSON.stringify(req, null, 2),
                response: JSON.stringify(resp, null, 2),
              }),
          );
        }
      },
    ],
  },
});
