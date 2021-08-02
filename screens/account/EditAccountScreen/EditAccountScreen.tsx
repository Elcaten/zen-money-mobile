import * as React from 'react';
import {useEffect, useMemo, useRef} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {ScrollView} from 'react-native';
import {useQueryClient} from 'react-query';
import {useAccountModels, useInstruments} from '../../../api-hooks';
import {QueryKeys} from '../../../api-hooks/query-keys';
import {useMutateAccount} from '../../../api-hooks/useMutateAccount';
import {AccountType} from '../../../api/models';
import {View} from '../../../components';
import {TextInputField} from '../../../components/Field';
import {TextInputFieldHandle} from '../../../components/Field/TextInputField';
import {PickerListItem} from '../../../components/ListItem';
import {SwitchListItem} from '../../../components/ListItem/SwitchListItem';
import {RUB_SHORT_TITLE} from '../../../constants/Constants';
import {useAccountTypes} from '../../../hooks/useAccountTypes';
import {useHeaderButtons} from '../../../hooks/useHeaderButtons';
import {AccountDetailsScreenProps} from '../../../types';
import {generateUUID, showToast} from '../../../utils';
import {EditableAccount} from './editable-account';

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
    handleSubmit,
    formState: {errors},
  } = useForm<EditableAccount>({defaultValues: account ?? emptyAccount});

  const {t} = useTranslation();

  const titleRef = useRef<TextInputFieldHandle>(null);
  useEffect(() => {
    if (errors.title) {
      titleRef.current?.shake();
    }
  }, [errors.title]);

  useEffect(() => {
    if (errors.type) {
      showToast(t('EditAccountScreen.UnsupportedTypeMessage'));
    }
  }, [errors.type, t]);

  const {mutateAsync, isLoading: isMutating} = useMutateAccount();
  const queryClient = useQueryClient();

  const onSavePress = useMemo(
    () =>
      handleSubmit(async (editableAccount: EditableAccount) => {
        const {success} = await mutateAsync(editableAccount);
        if (success) {
          await queryClient.invalidateQueries(QueryKeys.Accounts);
          showToast(t('EditAccountScreen.AccountSaved'));
          if (navigation.isFocused()) {
            navigation.pop();
          }
        } else {
          showToast(t('Error.UnexpectedError'));
        }
      }),
    [handleSubmit, mutateAsync, navigation, queryClient, t],
  );

  useHeaderButtons(navigation, {onSavePress});

  return (
    <ScrollView keyboardShouldPersistTaps="never">
      <View disabled={isMutating}>
        <Controller
          control={control}
          render={({field}) => (
            <TextInputField ref={titleRef} field={field} placeholder={t('EditAccountScreen.Title')} />
          )}
          name="title"
          rules={{required: true}}
        />

        <Controller
          control={control}
          render={({field: {onChange, value}}) => (
            <PickerListItem
              bottomDivider
              title={t('EditAccountScreen.AccountType')}
              value={accounTypes.get(value!) ?? ''}
              onPress={() => navigation.navigate('AccountTypePickerScreen', {value: value, onSelect: onChange})}
            />
          )}
          name="type"
          rules={{validate: (val) => val === AccountType.Card || val === AccountType.Cash}}
        />

        <Controller
          control={control}
          render={({field: {onChange, value}}) => {
            return (
              <PickerListItem
                bottomDivider
                title={t('EditAccountScreen.Instrument')}
                value={instruments.get(value!)?.title!}
                onPress={() =>
                  navigation.navigate('InstrumentPickerScreen', {
                    value: value,
                    onSelect: (i) => {
                      onChange(i);
                      navigation.goBack();
                    },
                  })
                }
              />
            );
          }}
          name="instrument"
          rules={{required: true}}
        />

        <Controller
          control={control}
          render={({field: {onChange, value}}) => (
            <SwitchListItem
              title={t('EditAccountScreen.Savings')}
              value={!!value}
              onValueChange={onChange}
              bottomDivider
            />
          )}
          name="savings"
        />

        <Controller
          control={control}
          render={({field: {onChange, value}}) => (
            <SwitchListItem
              title={t('EditAccountScreen.InBalance')}
              value={!!value}
              onValueChange={onChange}
              bottomDivider
            />
          )}
          name="inBalance"
        />

        <Controller
          control={control}
          render={({field: {onChange, value}}) => (
            <SwitchListItem
              title={t('EditAccountScreen.Archive')}
              value={!!value}
              onValueChange={onChange}
              bottomDivider
            />
          )}
          name="archive"
        />
      </View>
    </ScrollView>
  );
};
