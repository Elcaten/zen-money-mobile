export const TOKEN_KEY = 'elcaten.zen-money-mobile/@auth_token';

export const CLIENT_ID = 'g432d418d88b2b7a25be12ed5bbcc2';
export const CLIENT_SECRER = 'b2a719aaca';
export const REDIRECT_URL = 'exp://localhost:19000/--/*';
export const AUTH_URL = 'https://api.zenmoney.ru/oauth2/authorize/';
export const TOKEN_URL = (code: string) => `https://zenmoneyauth.azurewebsites.net/api/getauthtoken?code=${code}`;
export const REFRESH_TOKEN_URL = (refreshToken: string) =>
  `https://zenmoneyauth.azurewebsites.net/api/refreshtoken?refreshToken=${refreshToken}`;
export const API_URL = 'https://api.zenmoney.ru';

export const ACCOUNTS = 'accounts';
export const INSTRUMENTS = 'instruments';
export const TAGS = 'tags';
export const TRANSACTIONS = 'transactions';
export const USERS = 'users';
