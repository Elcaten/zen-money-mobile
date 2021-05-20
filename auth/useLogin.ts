import {loadAsync} from 'expo-auth-session';
import ky from 'ky';
import {useCallback} from 'react';
import {useQueryClient} from 'react-query';
import {AUTH_URL, CLIENT_ID, REDIRECT_URL, TOKEN_URL} from '../utils/manifest-extra';
import {AuthResonse, validateAuthTokenResponse} from './auth-response';
import {AuthToken} from './auth-token';
import {persistToken} from './persist-token';

const promptUserForAuth = async () => {
  const authRequest = await loadAsync(
    {
      clientId: CLIENT_ID,
      redirectUri: REDIRECT_URL,
    },
    {
      authorizationEndpoint: AUTH_URL,
    },
  );

  const result = await authRequest.promptAsync({
    authorizationEndpoint: AUTH_URL,
  });

  switch (result.type) {
    case 'success':
      const {code} = result.params;
      const authResponse = await ky.get(`${TOKEN_URL}${code}`).json<AuthResonse>();
      validateAuthTokenResponse(authResponse);
      return authResponse;
    case 'error':
      throw new Error(result.error?.message ?? result.errorCode ?? 'Unexpected login error');
    default:
      return null;
  }
};

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useCallback(async () => {
    const tokenResponse = await promptUserForAuth();
    const token = tokenResponse ? new AuthToken(tokenResponse) : null;
    await persistToken(token);
    queryClient.invalidateQueries();
  }, [queryClient]);
};
