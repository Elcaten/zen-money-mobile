export interface AuthTokenResponse {
  readonly access_token: string;
  readonly token_type: string;
  readonly expires_in: number;
  readonly refresh_token: string;
}

export interface AuthErrorResponse {
  error: string;
}

export type AuthResonse = AuthTokenResponse | AuthErrorResponse;

export function validateAuthTokenResponse(authResponse: AuthResonse): asserts authResponse is AuthTokenResponse {
  const error = (authResponse as AuthErrorResponse)?.error;
  if (error != null) {
    throw new Error(error);
  }
}
