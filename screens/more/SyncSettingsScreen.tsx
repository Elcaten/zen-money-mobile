import * as React from 'react';
import {useMemo, useRef, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {TouchableOpacity} from 'react-native';
import {CreditCardIcon, EyeOutlineIcon, TagIcon} from '../../components';
import {TextInputField} from '../../components/Field';
import {TextInputFieldHandle} from '../../components/Field/TextInputField';
import {PickerListItem} from '../../components/ListItem';
import {ScrollView} from '../../components/ScrollView';
import {useHeaderButtons, useShakeOnError} from '../../hooks';
import {useStore} from '../../store/use-store';
import {SyncSettingsScreenProps} from '../../types';

export const SyncSettingsScreen: React.FC<SyncSettingsScreenProps> = ({navigation}) => {
  const tinkoffUsername = useStore.use.tinkoffUsername();
  const tinkoffPassword = useStore.use.tinkoffPassword();
  const setTinkoffUsername = useStore.use.setTinkoffUsername();
  const setTinkoffPassword = useStore.use.setTinkoffPassword();

  const usernameRef = useRef<TextInputFieldHandle>(null);
  const passwordRef = useRef<TextInputFieldHandle>(null);

  const [hidePassword, setHidePassword] = useState(true);

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

  const {t} = useTranslation();

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
          return (
            <TextInputField
              ref={passwordRef}
              placeholder={'Password'}
              field={field}
              secureTextEntry={hidePassword}
              rightIcon={() => (
                <TouchableOpacity onPress={() => setHidePassword((v) => !v)}>
                  <EyeOutlineIcon />
                </TouchableOpacity>
              )}
            />
          );
        }}
        rules={{required: true}}
      />
      <PickerListItem
        leftIcon={() => <CreditCardIcon />}
        title={t('SyncSettingsScreen.AccountSetting')}
        onPress={() => navigation.navigate('SyncAccountSettingsScreen')}
      />
      <PickerListItem
        leftIcon={() => <TagIcon />}
        title={t('SyncSettingsScreen.TagSetting')}
        onPress={() => navigation.navigate('SyncTagSettingsScreen')}
      />
    </ScrollView>
  );
};
