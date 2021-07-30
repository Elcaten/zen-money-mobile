import * as React from 'react';
import {useCallback, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet} from 'react-native';
import {Button, Input, InputHandles} from 'react-native-elements';
import {useQueryClient} from 'react-query';
import {AuthToken, persistToken, useLogin, validateAuthTokenResponse} from '../auth';
import {setSignInPressedSelector, signInPressedSelector, useStore} from '../store/use-store';
import {DEMO_TOKEN} from '../utils';
import {Logo} from '../components/Logo';
import {View} from '../components/View';
import {ZenText} from '../components/ZenText';
import {Card} from '../components/Card';

export interface LoginScreenProps {}

export const LoginScreen: React.FC<LoginScreenProps> = (props) => {
  const login = useLogin();
  const [token, setToken] = useState<string | undefined>(undefined);
  const ref = useRef<InputHandles>(null);
  const queryClient = useQueryClient();
  const {t} = useTranslation();
  const signInPressed = useStore(signInPressedSelector);
  const setSignInPressed = useStore(setSignInPressedSelector);

  const onSignInPress = useCallback(() => {
    setSignInPressed(true);
    login();
  }, [login, setSignInPressed]);

  const onProceedPress = useCallback(async () => {
    if (token == null) {
      ref.current?.shake();
      return;
    }
    const tokenResponse = JSON.parse(token);
    validateAuthTokenResponse(tokenResponse);
    const authToken = new AuthToken(tokenResponse);
    await persistToken(authToken);
    await queryClient.invalidateQueries();
    setSignInPressed(false);
  }, [queryClient, setSignInPressed, token]);

  const onDemoPress = useCallback(async () => {
    const tokenResponse = DEMO_TOKEN;
    validateAuthTokenResponse(tokenResponse);
    const authToken = new AuthToken(tokenResponse);
    await persistToken(authToken);
    await queryClient.invalidateQueries();
  }, [queryClient]);

  return (
    <Card style={styles.container}>
      <View style={styles.logoContainer}>
        <Logo style={styles.logo} />
      </View>
      {!signInPressed && (
        <Button
          title={t('LoginScreen.SignIn')}
          onPress={onSignInPress}
          containerStyle={styles.buttonContainer}
          titleStyle={styles.buttonTitle}
        />
      )}
      {signInPressed && (
        <React.Fragment>
          <Input placeholder="Token" value={token} onChangeText={setToken} ref={ref as any} />
          <Button
            title={t('LoginScreen.Proceed')}
            onPress={onProceedPress}
            containerStyle={styles.buttonContainer}
            titleStyle={styles.buttonTitle}
          />
        </React.Fragment>
      )}
      <ZenText style={styles.divider}>or</ZenText>
      <Button
        title={t('LoginScreen.Demo')}
        onPress={onDemoPress}
        containerStyle={styles.buttonContainer}
        titleStyle={styles.buttonTitle}
      />
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    textAlign: 'center',
    padding: 16,
  },
  logoContainer: {
    alignSelf: 'center',
    marginHorizontal: 120,
    marginVertical: 16,
  },
  logo: {
    width: '100%',
    height: undefined,
    aspectRatio: 1,
  },
  buttonContainer: {
    margin: 8,
  },
  buttonTitle: {
    fontSize: 18,
  },
  divider: {
    alignSelf: 'center',
    fontSize: 18,
    marginVertical: 8,
  },
});
