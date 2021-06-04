import * as React from 'react';
import {useEffect, useRef} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {ScrollView} from 'react-native';
import {InputHandles} from 'react-native-elements';
import {useAccountModels, useInstruments} from '../../../api-hooks';
import {AccountType} from '../../../api/models';
import {Input, Text} from '../../../components';
import {Card} from '../../../components/Card';
import {RUB_SHORT_TITLE} from '../../../constants/Constants';
import {AccountDetailsScreenProps} from '../../../types';
import {generateUUID} from '../../../utils';
import {EditableAccount} from './editable-account';

export const EditAccountScreen: React.FC<AccountDetailsScreenProps> = ({navigation, route}) => {
  const accounts = useAccountModels();
  const account = accounts.data.find(({id}) => id === route.params.accountId);
  const {data: instruments} = useInstruments();

  const rubleInstrument = instruments.valuesArray().find((i) => i.shortTitle === RUB_SHORT_TITLE)!;
  const emptyAccount: EditableAccount = {
    id: generateUUID(),
    title: '',
    balance: 0,
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

  return (
    <Card>
      <Controller
        control={control}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            ref={titleRef}
            placeholder={t('Components.TagEditor.Title')}
            value={value}
            style={{fontSize: 16}}
            onBlur={onBlur}
            onChangeText={(text) => onChange(text)}
          />
        )}
        name="title"
        rules={{required: true}}
      />
    </Card>
  );
};
