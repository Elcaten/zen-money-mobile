import {Ionicons} from '@expo/vector-icons';
import * as React from 'react';
import {useCallback, useEffect, useLayoutEffect, useRef} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {ScrollView, StyleSheet, TextInput} from 'react-native';
import {InputHandles} from 'react-native-elements';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import {useQueryClient} from 'react-query';
import {useAccountModels, useInstruments} from '../../../api-hooks';
import {QueryKeys} from '../../../api-hooks/query-keys';
import {useMutateAccount} from '../../../api-hooks/useMutateAccount';
import {AccountType} from '../../../api/models';
import {Input} from '../../../components';
import {Card} from '../../../components/Card';
import {ListItem, PickerListItem} from '../../../components/ListItem';
import {SwitchListItem} from '../../../components/ListItem/SwitchListItem';
import {RUB_SHORT_TITLE} from '../../../constants/Constants';
import {useAccountTypes} from '../../../hooks/useAccountTypes';
import {AccountDetailsScreenProps} from '../../../types';
import {generateUUID, showToast} from '../../../utils';
import {EditableAccount} from './editable-account';
import {List} from 'react-native-paper';

export const EditAccountScreen: React.FC<AccountDetailsScreenProps> = ({navigation, route}) => {
  const accounts = useAccountModels();
  const account = accounts.data.find(({id}) => id === route.params.accountId);
  const {data: instruments} = useInstruments();
  const accounTypes = useAccountTypes();

  const rubleInstrument = instruments.valuesArray().find((i) => i.shortTitle === RUB_SHORT_TITLE)!;
  const emptyAccount: EditableAccount = {
    id: generateUUID(),
    archive: false,
    title: '',
    savings: false,
    creditLimit: null,
    balance: 0,
    inBalance: true,
    startBalance: 0,
    type: AccountType.Cash,
    instrument: rubleInstrument.id,
  };

  const {
    control,
    setValue,
    watch,
    handleSubmit,
    formState: {errors},
  } = useForm<EditableAccount>({defaultValues: account ?? emptyAccount});

  const titleRef = useRef<InputHandles>(null);
  useEffect(() => {
    if (errors.title) {
      titleRef.current?.shake();
    }
  }, [errors.title]);

  const {t} = useTranslation();

  const {mutateAsync, isLoading: isMutating} = useMutateAccount();
  const queryClient = useQueryClient();

  const onSavePress = useCallback(
    async (editableAccount: EditableAccount) => {
      const {success} = await mutateAsync(editableAccount);
      if (success) {
        await queryClient.invalidateQueries(QueryKeys.Accounts);
        showToast(t('Screen.EditAccount.AccountSaved'));
        navigation.pop();
      } else {
        showToast('Error');
      }
    },
    [mutateAsync, navigation, queryClient, t],
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButtons>
          <Item
            title={t('Screen.Tag.Save')}
            IconComponent={Ionicons}
            iconName="save-outline"
            iconSize={24}
            onPress={handleSubmit(onSavePress)}
          />
        </HeaderButtons>
      ),
    });
  }, [handleSubmit, navigation, onSavePress, t]);

  return (
    <ScrollView keyboardShouldPersistTaps="never">
      <Card style={isMutating ? styles.disabledView : []} pointerEvents={isMutating ? 'none' : 'auto'}>
        <Controller
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <ListItem bottomDivider>
              <Input
                value={value}
                style={{fontSize: 16}}
                placeholder={t('Components.TagEditor.Title')}
                onBlur={onBlur}
                onChangeText={(text) => onChange(text)}
              />
            </ListItem>
          )}
          name="title"
          rules={{required: true}}
        />

        <Controller
          control={control}
          render={({field: {onChange, value}}) => (
            <PickerListItem
              title={t('Screen.EditAccount.AccountType')}
              value={accounTypes.get(value!) ?? ''}
              onPress={() => navigation.navigate('AccountTypePickerScreen', {type: value, onSelect: onChange})}
            />
          )}
          name="type"
          rules={{required: true}}
        />

        <Controller
          control={control}
          render={({field: {onChange, value}}) => {
            return (
              <PickerListItem
                title={t('Screen.EditAccount.Instrument')}
                value={instruments.get(value!)?.title!}
                onPress={() => navigation.navigate('InstrumentPickerScreen', {instrument: value, onSelect: onChange})}
              />
            );
          }}
          name="instrument"
          rules={{required: true}}
        />

        <Controller
          control={control}
          render={({field: {onChange, value}}) => (
            <SwitchListItem title={t('Screen.EditAccount.Savings')} value={!!value} onValueChange={onChange} />
          )}
          name="savings"
        />

        <Controller
          control={control}
          render={({field: {onChange, value}}) => (
            <SwitchListItem title={t('Screen.EditAccount.InBalance')} value={!!value} onValueChange={onChange} />
          )}
          name="inBalance"
        />

        <Controller
          control={control}
          render={({field: {onChange, value}}) => (
            <SwitchListItem title={t('Screen.EditAccount.Archive')} value={!!value} onValueChange={onChange} />
          )}
          name="archive"
        />
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  disabledView: {
    opacity: 0.5,
  },
});
