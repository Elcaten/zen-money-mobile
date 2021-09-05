import {MaterialIcons} from '@expo/vector-icons';
import dayjs from 'dayjs';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {Controller, useFieldArray, useForm, useWatch} from 'react-hook-form';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {SwipeListView} from 'react-native-swipe-list-view';
import {Item} from 'react-navigation-header-buttons';
import {AccountModel, useAccountModels, useTags} from '../../../api-hooks';
import {Tag, Transaction} from '../../../api/models';
import {TrashIcon} from '../../../components';
import {ListItem} from '../../../components/ListItem';
import {ScrollView} from '../../../components/ScrollView';
import {ZenOverlay} from '../../../components/ZenOverlay';
import {ZenText} from '../../../components/ZenText';
import {GREEN_500, RED_500} from '../../../constants/Colors';
import {useHeaderButtons} from '../../../hooks';
import {OperationsCommand} from '../../../lib/tinkoff-api/commands';
import {useStore} from '../../../store/use-store';
import {useNavigatorThemeColors} from '../../../themes';
import {useOperations} from '../../../tinkoff/useOperations';
import {SyncScreenProps} from '../../../types';
import {DateField} from '../../analytics/FilterAnalyticsButton/DateField';
import {AccountPicker} from '../../components/AccountPicker';
import {SyncAccountPicker} from '../../components/SyncAccountPicker';
import {SyncTagPicker} from '../../components/SyncTagPicker';
import {TagListPicker} from '../../components/TagListPicker';
import {Operation, OperationMapping} from './types';

const HIDDEN_ITEM_WIDTH = 100;

export const SyncScreen: React.FC<SyncScreenProps> = ({navigation, route}) => {
  const {data: tags} = useTags();
  const {data: accounts} = useAccountModels();

  if (tags?.size > 0 && accounts.length > 0) {
    return <SyncScreenComponent tags={tags} accounts={accounts} navigation={navigation} route={route} />;
  } else {
    return <React.Fragment />;
  }
};

interface SyncScreenComponentProps extends SyncScreenProps {
  tags: Map<string, Tag>;
  accounts: AccountModel[];
}

const SyncScreenComponent: React.FC<SyncScreenComponentProps> = ({tags, accounts, navigation}) => {
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());
  const {data, isLoading, invalidate} = useOperations(start, end);

  const _cardInfo = useStore.use.cardInfo();
  const cardInfo = useMemo(() => new Map(_cardInfo.map((c) => [c.cardNumber, c])), [_cardInfo]);
  const excludedCards = useMemo(
    () => new Set(_cardInfo.filter((c) => c.excludeFromSync).map((c) => c.cardNumber)),
    [_cardInfo],
  );

  const _categoryInfo = useStore.use.categoryInfo();
  const categoryInfo = useMemo(() => new Map(_categoryInfo.map((c) => [c.categoryId, c])), [_categoryInfo]);

  const {
    control,
    formState: {errors},
    setValue,
  } = useForm<{mappings: OperationMapping[]}>({});

  const {fields, remove, update} = useFieldArray({
    control,
    name: 'mappings',
  });

  useEffect(() => {
    setValue(
      'mappings',
      data
        ?.filter(
          (o) =>
            o.status === OperationsCommand.OperationStatus.OK &&
            (o.cardNumber == null || !excludedCards.has(o.cardNumber)),
        )
        .map((operation) => ({
          operation,
          tagId: categoryInfo.tryGet(operation.category.id, undefined)?.tagId,
          accountId: cardInfo.tryGet(operation.cardNumber, undefined)?.accountId,
          accountTitle: cardInfo.tryGet(operation.cardNumber, undefined)?.accountTitle,
        })) ?? [],
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accounts, data, tags]);

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
  const onSavePress = useCallback(() => {
    if (formData.mappings == null) {
      return;
    }
    const trDrafts: Transaction[] = [];
    for (let i = 0; i < formData.mappings?.length; i++) {}
  }, [formData.mappings]);
  useHeaderButtons(navigation, {renderButtons, onSavePress});

  return (
    <View style={styles.wrapper}>
      <ZenOverlay
        isVisible={isOverlayVisible}
        onBackdropPress={() => {
          setIsOverlayVisible(false);
          setSelectedOperation(null);
        }}>
        <ScrollView>
          <ZenText>{selectedOperation ? JSON.stringify(selectedOperation, null, 2) : 'No operation selected'}</ZenText>
        </ScrollView>
      </ZenOverlay>

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
                  <ZenText numberOfLines={1} style={{flex: 1}}>
                    {operation.category.name} {operation.description}
                  </ZenText>
                  <ZenText>{date.format(date.isToday() ? 'HH:mm' : 'DD MMM HH:mm')}</ZenText>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <ZenText style={{flex: 1}}>{operation.cardNumber}</ZenText>
                  <ZenText style={{flex: 1}}>{operation.payment?.cardNumber}</ZenText>
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
                  <Controller
                    control={control}
                    name={`mappings.${index}.tagId` as 'mappings.0.tagId'}
                    render={() => (
                      <TagListPicker
                        RenderAs={SyncTagPicker}
                        tag={tags.get(item.tagId!)}
                        onSelect={(tag) => {
                          update(index, {...item, tagId: tag.id});
                        }}
                      />
                    )}
                  />
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
