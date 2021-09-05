import dayjs from 'dayjs';
import React, {useEffect, useMemo, useState} from 'react';
import {Controller, useFieldArray, useForm} from 'react-hook-form';
import {ListItem} from 'react-native-elements';
import {View} from '../../components';
import {ScrollView} from '../../components/ScrollView';
import {ZenOverlay} from '../../components/ZenOverlay';
import {ZenText} from '../../components/ZenText';
import {useHeaderButtons} from '../../hooks';
import {CardInfo, useStore} from '../../store/use-store';
import {useOperations} from '../../tinkoff/useOperations';
import {SyncAccountSettingsScreenProps} from '../../types';
import {notNull} from '../../utils';
import {AccountPicker} from '../components/AccountPicker';
import {BadgeButton} from '../components/BadgeButton';
import {SyncAccountPicker} from '../components/SyncAccountPicker';

export const SyncAccountSettingsScreen: React.FC<SyncAccountSettingsScreenProps> = ({navigation}) => {
  const [start] = useState(dayjs(new Date()).subtract(1, 'week').toDate());
  const [end] = useState(new Date());
  const {data: lastWeekOperations, isLoading} = useOperations(start, end);

  const {
    control,
    formState: {errors},
    setValue,
    handleSubmit,
  } = useForm<{cardInfo: CardInfo[]}>({});

  const {fields, remove, update} = useFieldArray({
    control,
    name: 'cardInfo',
  });

  const cardInfo = useStore.use.cardInfo();
  const setCardInfo = useStore.use.setCardInfo();

  useEffect(() => {
    const lastWeekCardNumbers = Array.from(
      new Set(lastWeekOperations?.map((o) => o.cardNumber ?? o.payment?.cardNumber).filter(notNull)),
    );
    const result = [...cardInfo];
    for (const cardNumber of lastWeekCardNumbers) {
      if (!cardInfo.some((i) => i.cardNumber === cardNumber)) {
        result.push({cardNumber});
      }
    }
    setValue('cardInfo', result);
  }, [cardInfo, lastWeekOperations, setValue]);

  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const [selectedCardNumber, setSelectedCardNumber] = useState<string | null>(null);
  const cardNumberOperations = useMemo(
    () => lastWeekOperations?.filter((o) => o.cardNumber === selectedCardNumber) ?? [],
    [lastWeekOperations, selectedCardNumber],
  );

  const onSavePress = useMemo(() => handleSubmit((x) => setCardInfo(x.cardInfo)), [handleSubmit, setCardInfo]);
  useHeaderButtons(navigation, {onSavePress});

  return (
    <React.Fragment>
      <ZenOverlay
        isVisible={isOverlayVisible}
        onBackdropPress={() => {
          setIsOverlayVisible(false);
          setSelectedCardNumber(null);
        }}>
        <ScrollView>
          {cardNumberOperations.map((o) => {
            const sign = o.type === 'Debit' ? '-' : o.type === 'Credit' ? '+' : '??';
            return (
              <ListItem key={o.id} bottomDivider>
                <ZenText>
                  {JSON.stringify(
                    {
                      date: dayjs(o.operationTime.milliseconds).format('DD MMM HH:mm'),
                      category: o.category?.name,
                      description: o.description,
                      cardNumber: o.cardNumber,
                      amount: `${sign} ${o.accountAmount.value} ${o.accountAmount.currency.name}`,
                    },
                    null,
                    2,
                  )}
                </ZenText>
              </ListItem>
            );
          })}
        </ScrollView>
      </ZenOverlay>
      <ScrollView>
        {isLoading && <ZenText>Loading...</ZenText>}
        {fields.map((field, index) => (
          <Controller
            key={field.id}
            control={control}
            name={`cardInfo.${index}.cardNumber` as 'cardInfo.0.cardNumber'}
            render={() => (
              <ListItem
                onPress={() => {
                  setSelectedCardNumber(field.cardNumber);
                  setIsOverlayVisible(true);
                }}
                bottomDivider
                containerStyle={{flexDirection: 'column', alignItems: 'flex-start'}}
                style={field.excludeFromSync ? {opacity: 0.5} : {}}>
                <ListItem.Title>{field.cardNumber}</ListItem.Title>
                <View style={{flexDirection: 'row', marginTop: 8}}>
                  <BadgeButton
                    title={field.excludeFromSync ? 'Exclude' : 'Include'}
                    onPress={() => {
                      update(index, {
                        ...field,
                        excludeFromSync: !field.excludeFromSync,
                      });
                    }}
                  />
                  <AccountPicker
                    RenderAs={SyncAccountPicker}
                    title={field.accountTitle}
                    value={field.accountId}
                    onSelect={(account) => {
                      update(index, {
                        ...field,
                        accountId: account.id,
                        accountTitle: account.title,
                      });
                    }}
                    recentAccounts={[]}
                  />
                </View>
              </ListItem>
            )}
          />
        ))}
      </ScrollView>
    </React.Fragment>
  );
};
