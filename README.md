# ZenMoneyMobile

An unofficial, open source Android/iOS client for https://zenmoney.ru/

It's a small expense tracking app.

A subset of features from the official app are implemented so far.

## Downloading

ZenMoneyMobile is available on the expo.dev:

https://expo.dev/@nameless1one/zen-money-mobile

## Building

ZenMoneyMobile is built using [expo cli](https://docs.expo.dev/workflow/expo-cli/)
You have to set the following environment variables:

    API_TOKEN_PERISIT_KEY=<KEY_TO_PERSIST_API_TOKEN>
    API_URL=https://api.zenmoney.ru
    AUTH_URL=https://api.zenmoney.ru/oauth2/authorize
    BUGSNAG_API_KEY=<YOUR_BUGSNAG_API_KEY>
    CLIENT_ID=<ZEN_MONEY_OAUTH_CLIENT_ID> # you can get your client id at http://developers.zenmoney.ru/index.html
    DEMO_TOKEN=<AUTH_TOKEN_FOR_ZEN_MONEY_DEMO_ACCOUNT> # you should create demo account at https://zenmoney.ru and get auth token for that account at https://api.zenmoney.ru/oauth2/authorize
    ENVIRONMENT=<ENVIRONMENT_NAME> # should be 'dev' when running locally
    LAST_FOREGROUND_TIMESTAMP_PERSIST_KEY=<KEY_TO_PERSIST_LAST_FOREGROUND_TIMESTAMP>
    LOCK_SCREEN_TIMEOUT=<TIMEOUT_IN_MS_TO_LOCK_THE_APP>
    SESSION_ID_PERSIST_KEY=<KEY_TO_PERSIST_SESSION_ID>
    REACT_QUERY_PERSIST_KEY=<KEY_TO_PERSIST_REACT_QUERY_CACHE>
    REDIRECT_URL=<ZEN_MONEY_OAUTH_REDIRECT_URL> # redirect url for your app

and then run:

    npm install && npm run start

## Screenshots

<p align="center">
  <img src="https://user-images.githubusercontent.com/4154662/130133016-a56b3cfe-2b74-466e-9df5-1fff2d30fd8e.jpg" height="500" title="accounts">
  <img src="https://user-images.githubusercontent.com/4154662/130133018-2dc104f8-7281-4585-982f-08e3cf171b3e.jpg" height="500" alt="transaction">
  <img src="https://user-images.githubusercontent.com/4154662/130140779-66f559b6-0bca-490e-88d4-d8dd0f12e9a2.jpg" height="500" alt="transaction details">
  <img src="https://user-images.githubusercontent.com/4154662/130133020-105b7e81-2cd4-486b-bdd1-738e885e1fec.jpg" height="500" alt="analytics">
  <img src="https://user-images.githubusercontent.com/4154662/130133012-527ee141-ac7c-482d-a5b0-de46fa0aeeae.jpg" height="500" alt="settings">
  <img src="https://user-images.githubusercontent.com/4154662/130140784-b38c15aa-d6b4-4a15-a1a3-7f814c78b7ed.jpg" height="500" alt="categories">
</p>

## License

ZenMoneyMobile is licensed under the GPL, version 3. A copy of the license is included in [LICENSE.txt](LICENSE.txt).
