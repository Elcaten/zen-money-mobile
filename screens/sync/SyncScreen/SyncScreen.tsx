import {MaterialIcons} from '@expo/vector-icons';
import dayjs from 'dayjs';
import React, {useCallback, useEffect, useState} from 'react';
import {Controller, useFieldArray, useForm, useWatch} from 'react-hook-form';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {SwipeListView} from 'react-native-swipe-list-view';
import {Item} from 'react-navigation-header-buttons';
import {AccountModel, useAccountModels, useInstruments, useTags} from '../../../api-hooks';
import {Instrument, Tag} from '../../../api/models';
import {TrashIcon} from '../../../components';
import {ListItem} from '../../../components/ListItem';
import {ScrollView} from '../../../components/ScrollView';
import {ZenFormSheet} from '../../../components/ZenFormSheet';
import {ZenText} from '../../../components/ZenText';
import {GREEN_500, RED_500} from '../../../constants/Colors';
import {useHeaderButtons} from '../../../hooks';
import {useNavigatorThemeColors} from '../../../themes';
import {useOperations} from '../../../tinkoff/useOperations';
import {SyncScreenProps} from '../../../types';
import {generateUUID} from '../../../utils';
import {DateField} from '../../analytics/FilterAnalyticsButton/DateField';
import {AccountPicker} from '../../components/AccountPicker';
import {SyncAccountPicker} from '../../components/SyncAccountPicker';
import {SyncMappingTypePicker} from '../../components/SyncMappingTypePicker';
import {SyncTagPicker} from '../../components/SyncTagPicker';
import {TagListPicker} from '../../components/TagListPicker';
import {IncomeExpenseTransaction, TransferTransaction} from '../../transactions/EditTransactionScreen';
import {Operation, OperationMapping} from './types';
import {useOperationMappings} from './useOperationMappings';
import {useSaveMappings} from './useSaveMappings';

const HIDDEN_ITEM_WIDTH = 100;

export const SyncScreen: React.FC<SyncScreenProps> = ({navigation, route}) => {
  const {data: tags} = useTags();
  const {data: accounts} = useAccountModels();
  const {data: instruments} = useInstruments();

  if (tags?.size > 0 && accounts.length > 0 && instruments.size > 0) {
    return (
      <SyncScreenComponent
        tags={tags}
        accounts={accounts}
        instruments={instruments}
        navigation={navigation}
        route={route}
      />
    );
  } else {
    return <React.Fragment />;
  }
};

interface SyncScreenComponentProps extends SyncScreenProps {
  tags: Map<string, Tag>;
  accounts: AccountModel[];
  instruments: Map<number, Instrument>;
}

const SyncScreenComponent: React.FC<SyncScreenComponentProps> = ({tags, accounts, instruments, navigation}) => {
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());
  const {data: operations, isLoading, invalidate} = useOperations(start, end);

  const {
    control,
    formState: {errors},
    setValue,
  } = useForm<{mappings: OperationMapping[]}>({});

  const {fields, remove, update} = useFieldArray({
    control,
    name: 'mappings',
  });

  const mappings = useOperationMappings(operations, tags, accounts);
  useEffect(() => {
    setValue('mappings', mappings);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mappings]);

  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const [selectedOperation, setSelectedOperation] = useState<Operation | null>(null);
  const {error, onError, text} = useNavigatorThemeColors();

  const renderButtons = useCallback(
    () => (
      <Item
        title=""
        IconComponent={MaterialIcons}
        iconName="settings"
        iconSize={24}
        onPress={() => navigation.navigate('More', {initial: false, screen: 'SyncSettingsScreen'})}
      />
    ),
    [navigation],
  );
  const formData = useWatch({control});
  const {onSavePress, isLoading: isAddingTransactions} = useSaveMappings(instruments, formData.mappings);

  useHeaderButtons(navigation, {renderButtons, onSavePress, disabled: isAddingTransactions});

  return (
    <View style={styles.wrapper}>
      <ZenFormSheet
        visible={isOverlayVisible}
        onRequestClose={() => {
          setIsOverlayVisible(false);
          setSelectedOperation(null);
        }}>
        <ZenFormSheet.Header>
          <ZenFormSheet.CancelButton
            onPress={() => {
              setIsOverlayVisible(false);
              setSelectedOperation(null);
            }}
          />
        </ZenFormSheet.Header>
        <ScrollView style={{padding: 8}}>
          <ZenText>
            {selectedOperation
              ? JSON.stringify(
                  {
                    paymentCardNumber: selectedOperation.payment?.cardNumber,
                    cardNumber: selectedOperation.cardNumber,
                    subcategory: selectedOperation.subcategory,
                    description: selectedOperation.description,
                    categoryName: selectedOperation.category.name,
                    isExternalCard: selectedOperation.isExternalCard,
                    type: selectedOperation.type === 'Debit' ? '-' : selectedOperation.type === 'Credit' ? '+' : '??',
                    amount: `${selectedOperation.amount.value} ${selectedOperation.amount.currency.name}`,
                    accountAmount: `${selectedOperation.accountAmount.value} ${selectedOperation.accountAmount.currency.name}`,
                  },
                  null,
                  2,
                )
              : 'No operation selected'}
          </ZenText>
        </ScrollView>
      </ZenFormSheet>

      <ListItem>
        <DateField value={start} onChange={setStart} />
        <ZenText> - </ZenText>
        <DateField value={end} onChange={setEnd} />
      </ListItem>

      <SwipeListView
        useFlatList={true}
        refreshing={isLoading}
        onRefresh={invalidate}
        data={fields}
        renderItem={({item, index}, rowMap) => {
          const operation = item.operation;
          const date = dayjs(operation.operationTime.milliseconds);
          const sign = operation.type === 'Debit' ? '-' : operation.type === 'Credit' ? '+' : '??';
          const amountColor = operation.type === 'Debit' ? RED_500 : operation.type === 'Credit' ? GREEN_500 : text;

          return (
            <ListItem
              key={item.operation.id}
              onPress={() => {
                setSelectedOperation(item.operation);
                setIsOverlayVisible(true);
              }}>
              <ListItem.Content>
                <View style={{flexDirection: 'row'}}>
                  <Controller
                    control={control}
                    name={`mappings.${index}.type` as 'mappings.0.type'}
                    render={() => (
                      <SyncMappingTypePicker
                        onSelect={(type) => {
                          update(index, {...item, type});
                        }}
                        containerStyle={{marginRight: 12}}
                        value={item.type}
                      />
                    )}
                  />
                  <View style={{flex: 1}}>
                    <View style={{flexDirection: 'row'}}>
                      <ZenText numberOfLines={1} style={{flex: 1}}>
                        {operation.category.name} {operation.description}
                      </ZenText>
                      <ZenText>{date.format(date.isToday() ? 'HH:mm' : 'DD MMM HH:mm')}</ZenText>
                    </View>

                    <View style={{flexDirection: 'row'}}>
                      <ZenText style={{flex: 1}}>{operation.cardNumber ?? operation.payment?.cardNumber}</ZenText>
                      <ZenText style={{color: amountColor}}>
                        {sign} {operation.accountAmount.value} {operation.accountAmount.currency.name}
                      </ZenText>
                    </View>

                    <View style={{flexDirection: 'row', marginTop: 8}}>
                      <Controller
                        control={control}
                        name={`mappings.${index}.accountId` as 'mappings.0.accountId'}
                        render={() => (
                          <AccountPicker
                            RenderAs={SyncAccountPicker}
                            title={item.accountTitle}
                            value={item.accountId}
                            onSelect={(account) => {
                              update(index, {
                                ...item,
                                accountId: account.title,
                                accountTitle: account.title,
                              });
                            }}
                            recentAccounts={[]}
                          />
                        )}
                      />
                      {(item.type === 'expense' || item.type === 'income') && (
                        <Controller
                          control={control}
                          name={`mappings.${index}.tagId` as 'mappings.0.tagId'}
                          render={() => (
                            <TagListPicker
                              RenderAs={SyncTagPicker}
                              tag={tags.get(item.tagId!)}
                              onSelect={(tag) => {
                                update(index, {...item, tagId: tag?.id});
                              }}
                            />
                          )}
                        />
                      )}
                    </View>
                  </View>
                </View>
              </ListItem.Content>
            </ListItem>
          );
        }}
        renderHiddenItem={(data, rowMap) => (
          <TouchableOpacity
            style={[styles.hiddenItemWrapper, {backgroundColor: error}]}
            onPress={() => remove(data.index)}>
            <View style={styles.hiddenItemIconWrapper}>
              <TrashIcon size={32} color={onError} />
            </View>
          </TouchableOpacity>
        )}
        leftOpenValue={HIDDEN_ITEM_WIDTH}
      />
    </View>
  );
};

export const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  hiddenItemWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  hiddenItemIconWrapper: {
    width: HIDDEN_ITEM_WIDTH,
    alignItems: 'center',
  },
});
