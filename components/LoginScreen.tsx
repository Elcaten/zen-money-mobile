import {MaterialCommunityIcons} from '@expo/vector-icons';
import * as React from 'react';
import {useCallback, useRef, useState} from 'react';
import {StyleSheet} from 'react-native';
import {Button, InputHandles} from 'react-native-elements';
import {useQueryClient} from 'react-query';
import {AuthToken, persistToken, useLogin, validateAuthTokenResponse} from '../auth';
import {Input} from './Input';
import {View} from './View';

export interface LoginScreenProps {}

export const LoginScreen: React.FC<LoginScreenProps> = (props) => {
  const login = useLogin();
  const [token, setToken] = useState<string | undefined>(undefined);
  const ref = useRef<InputHandles>(null);
  const queryClient = useQueryClient();

  const onPress = useCallback(async () => {
    if (token == null) {
      ref.current?.shake();
      return;
    }
    const tokenResponse = JSON.parse(token);
    validateAuthTokenResponse(tokenResponse);
    const authToken = new AuthToken(tokenResponse);
    await persistToken(authToken);
    queryClient.invalidateQueries();
  }, [queryClient, token]);

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button title="Login" onPress={login} />
      </View>
      <View style={styles.fallbackLogin}>
        <Input
          placeholder="token"
          value={token}
          onChangeText={setToken}
          rightIcon={<MaterialCommunityIcons name="send" size={24} onPress={onPress} />}
          ref={ref as any}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  buttonContainer: {
    alignItems: 'center',
  },
  fallbackLogin: {
    margin: 16,
  },
});
