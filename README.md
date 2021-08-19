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
    REACT_QUERY_PERSIST_KEY=<KEY_TO_PERSIST_REACT_QUERY_CACHE>
    REDIRECT_URL=<ZEN_MONEY_OAUTH_REDIRECT_URL> # redirect url for your app

and then run:

    npm install && npm run start

## License

ZenMoneyMobile is licensed under the GPL, version 3. A copy of the license is included in [LICENSE.txt](LICENSE.txt).
