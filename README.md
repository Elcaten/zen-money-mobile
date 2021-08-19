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

    REACT_QUERY_PERSIST_KEY=<KEY_TO_PERSIST_REACT_QUERY_CACHE>
    PERSISIT_TOKEN_KEY=<KEY_TO_PERSIST_API_TOKEN>
    PERSIST_LAST_TIMESTAMP_KEY=<KEY_TO_PERSIST_LAST_TRANSITION_TO_BACKROUND_TIMESTAMP>
    LOCK_SCREEN_TIMEOUT=<TIMEOUT_IN_MS_TO_LOCK_THE_APP>
    CLIENT_ID=<ZEN_MONEY_OAUTH_CLIENT_ID> # you can get your client id at http://developers.zenmoney.ru/index.html
    REDIRECT_URL=<ZEN_MONEY_OAUTH_REDIRECT_URL> # redirect url for your app
    AUTH_URL=https://api.zenmoney.ru/oauth2/authorize
    TOKEN_URL=https://zenmoneyauth.azurewebsites.net/api/GetAuthToken?code= # AuthSession is not yet supported. Tokens should be manually copied into the app using this site
    REFRESH_TOKEN_URL=<ZEN_MONEY_OAUTH_REFRESH_TOKEN_URL> # should be https://api.zenmoney.ru/oauth2/refresh_token
    API_URL=<ZEN_MONEY_API_URL> # should be https://api.zenmoney.ru
    DEMO_TOKEN=<AUTH_TOKEN_TO_ACCESS_DEMO_API_ACCOUNT> # JSON token for demo account from https://api.zenmoney.ru/oauth2/token
    BUGSNAG_API_KEY=<YOUR_BUGSNAG_API_KEY>

and then run:

    npm install && npm run start

## License

ZenMoneyMobile is licensed under the GPL, version 3. A copy of the license is included in [LICENSE.txt](LICENSE.txt).
