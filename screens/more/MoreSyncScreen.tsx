import * as React from 'react';
import {useMemo, useRef} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {TextInputField} from '../../components/Field';
import {TextInputFieldHandle} from '../../components/Field/TextInputField';
import {ScrollView} from '../../components/ScrollView';
import {useHeaderButtons, useShakeOnError} from '../../hooks';
import {useSecureStore} from '../../store/use-secure-store';
import {MoreSyncScreenProps} from '../../types';

export const MoreSyncScreen: React.FC<MoreSyncScreenProps> = ({navigation}) => {
  const tinkoffUsername = useSecureStore.use.tinkoffUsername();
  const tinkoffPassword = useSecureStore.use.tinkoffPassword();
  const setTinkoffUsername = useSecureStore.use.setTinkoffUsername();
  const setTinkoffPassword = useSecureStore.use.setTinkoffPassword();

  const usernameRef = useRef<TextInputFieldHandle>(null);
  const passwordRef = useRef<TextInputFieldHandle>(null);

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: {errors},
  } = useForm<{username: string; password: string}>({
    defaultValues: {username: tinkoffUsername, password: tinkoffPassword},
  });

  const onSavePress = useMemo(
    () =>
      handleSubmit(({username, password}) => {
        setTinkoffUsername(username);
        setTinkoffPassword(password);
      }),
    [handleSubmit, setTinkoffPassword, setTinkoffUsername],
  );

  useHeaderButtons(navigation, {onSavePress});

  useShakeOnError(usernameRef, errors.username);
  useShakeOnError(passwordRef, errors.password);

  return (
    <ScrollView>
      <Controller
        control={control}
        name="username"
        render={({field}) => {
          return <TextInputField ref={usernameRef} placeholder={'Username'} field={field} />;
        }}
        rules={{required: true}}
      />
      <Controller
        control={control}
        name="password"
        render={({field}) => {
          return <TextInputField ref={passwordRef} placeholder={'Password'} field={field} secureTextEntry={true} />;
        }}
        rules={{required: true}}
      />
    </ScrollView>
  );
};
