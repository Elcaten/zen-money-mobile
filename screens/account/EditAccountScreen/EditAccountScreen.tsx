import * as React from 'react';
import {useEffect, useMemo, useRef} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {ScrollView, StyleSheet} from 'react-native';
import {InputHandles} from 'react-native-elements';
import {useQueryClient} from 'react-query';
import {useAccountModels, useInstruments} from '../../../api-hooks';
import {QueryKeys} from '../../../api-hooks/query-keys';
import {useMutateAccount} from '../../../api-hooks/useMutateAccount';
import {AccountType} from '../../../api/models';
import {Card} from '../../../components/Card';
import {TextInputField} from '../../../components/Field';
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

  const titleRef = useRef<InputHandles>(null);
  useEffect(() => {
    if (errors.title) {
      titleRef.current?.shake();
    }
  }, [errors.title]);

  const {t} = useTranslation();

  const {mutateAsync, isLoading: isMutating} = useMutateAccount();
  const queryClient = useQueryClient();

  const onSavePress = useMemo(
    () =>
      handleSubmit(async (editableAccount: EditableAccount) => {
        const {success} = await mutateAsync(editableAccount);
        if (success) {
          await queryClient.invalidateQueries(QueryKeys.Accounts);
          showToast(t('EditAccountScreen.AccountSaved'));
          navigation.pop();
        } else {
          showToast('Error');
        }
      }),
    [handleSubmit, mutateAsync, navigation, queryClient, t],
  );

  useHeaderButtons(navigation, {onSavePress});

  return (
    <ScrollView keyboardShouldPersistTaps="never">
      <Card style={isMutating ? styles.disabledView : []} pointerEvents={isMutating ? 'none' : 'auto'}>
        <Controller
          control={control}
          render={({field}) => <TextInputField field={field} placeholder={t('EditAccountScreen.Title')} sty />}
          name="title"
          rules={{required: true}}
        />

        <Controller
          control={control}
          render={({field: {onChange, value}}) => (
            <PickerListItem
              title={t('EditAccountScreen.AccountType')}
              value={accounTypes.get(value!) ?? ''}
              onPress={() => navigation.navigate('AccountTypePickerScreen', {value: value, onSelect: onChange})}
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
            <SwitchListItem title={t('EditAccountScreen.Savings')} value={!!value} onValueChange={onChange} />
          )}
          name="savings"
        />

        <Controller
          control={control}
          render={({field: {onChange, value}}) => (
            <SwitchListItem title={t('EditAccountScreen.InBalance')} value={!!value} onValueChange={onChange} />
          )}
          name="inBalance"
        />

        <Controller
          control={control}
          render={({field: {onChange, value}}) => (
            <SwitchListItem title={t('EditAccountScreen.Archive')} value={!!value} onValueChange={onChange} />
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
