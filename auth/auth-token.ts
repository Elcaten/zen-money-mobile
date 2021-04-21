import {AuthTokenResponse} from './auth-response';

export class AuthToken {
  readonly accessToken: string;
  readonly refreshToken: string;
  readonly expires: number;

  constructor(token: AuthTokenResponse) {
    this.accessToken = token.access_token;
    this.refreshToken = token.refresh_token;
    this.expires = new Date().getTime() + token.expires_in * 1000;
  }
}
