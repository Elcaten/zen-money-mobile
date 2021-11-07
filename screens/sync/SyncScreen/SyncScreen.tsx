import {MaterialIcons} from '@expo/vector-icons';
import dayjs from 'dayjs';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {useFieldArray, useForm, useWatch} from 'react-hook-form';
import {ListRenderItemInfo, StyleSheet, View} from 'react-native';
import {SwipeListView} from 'react-native-swipe-list-view';
import {Item} from 'react-navigation-header-buttons';
import {AccountModel, useAccountModels, useInstruments, useTags} from '../../../api-hooks';
import {Instrument, Tag} from '../../../api/models';
import {ListItem} from '../../../components/ListItem';
import {ZenText} from '../../../components/ZenText';
import {useHeaderButtons, useHeaderTitle} from '../../../hooks';
import {useStore} from '../../../store/use-store';
import {useOperations} from '../../../tinkoff/useOperations';
import {SyncScreenProps} from '../../../types';
import {DateField} from '../../analytics/FilterAnalyticsButton/DateField';
import {OperationDetailsPageSheet} from './OperationDetailsPageSheet';
import {OperationListItem} from './OperationListItem';
import {RemoveOperaionButton} from './RemoveOperaionButton';
import {Operation, OperationMapping} from './types';
import {useOperationMappings} from './useOperationMappings';
import {useSaveMappings} from './useSaveMappings';
import {useTranslation} from 'react-i18next';

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
  const lastSyncDate = useStore.use.lastSyncDate();

  const [start, setStart] = useState(lastSyncDate ? new Date(lastSyncDate) : new Date());
  const [end, setEnd] = useState(new Date());
  const {data: operations, isLoading, invalidate} = useOperations(start, end);

  useEffect(() => {
    if (lastSyncDate) {
      setStart(new Date(lastSyncDate));
    }
  }, [lastSyncDate]);

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
  const onOverlayClose = useCallback(() => {
    setIsOverlayVisible(false);
    setSelectedOperation(null);
  }, []);
  const [selectedOperation, setSelectedOperation] = useState<Operation | null>(null);

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

  const {t} = useTranslation();
  const headerTitle = useMemo(
    () => `${t('TransactionsScreen.LastSync')} ${dayjs(lastSyncDate).format('DD MMM')}`,
    [lastSyncDate, t],
  );
  useHeaderTitle(navigation, headerTitle);

  const removeItem = useCallback((index: number) => remove(index), [remove]);
  const renderRemoveOperationButton = useCallback(
    (data: ListRenderItemInfo<OperationMapping>) => (
      <RemoveOperaionButton width={HIDDEN_ITEM_WIDTH} index={data.index} onPress={removeItem} />
    ),
    [removeItem],
  );

  const onListItemPress = useCallback((mapping: OperationMapping) => {
    setSelectedOperation(mapping.operation);
    setIsOverlayVisible(true);
  }, []);
  const updateItem = useCallback((index: number, item: OperationMapping) => update(index, item), [update]);
  const renderListItem = useCallback(
    (data: ListRenderItemInfo<OperationMapping>) => (
      <OperationListItem
        control={control}
        index={data.index}
        item={data.item}
        onPress={onListItemPress}
        onUpdate={updateItem}
      />
    ),
    [control, onListItemPress, updateItem],
  );

  return (
    <View style={styles.wrapper}>
      <OperationDetailsPageSheet
        operation={selectedOperation}
        visible={isOverlayVisible}
        onRequestClose={onOverlayClose}
      />

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
        renderItem={renderListItem}
        renderHiddenItem={renderRemoveOperationButton}
        leftOpenValue={HIDDEN_ITEM_WIDTH}
      />
    </View>
  );
};

export const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
});
