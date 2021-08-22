import DateTimePicker from '@react-native-community/datetimepicker';
import dayjs from 'dayjs';
import * as React from 'react';
import {useCallback, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Platform, StyleSheet, TouchableOpacity} from 'react-native';
import {Button, ButtonGroup, Overlay} from 'react-native-elements';
import {FAB} from 'react-native-paper';
import {View} from '../../components';
import {ListItem} from '../../components/ListItem';
import {ZenText} from '../../components/ZenText';
import {useNavigatorThemeColors} from '../../themes';
import {IncomeExpenseTransaction, TransactionType} from '../transactions';

export enum GroupTransactionsBy {
  Week = 'Week',
  Month = 'Month',
  Year = 'Year',
  Custom = 'Custom',
}

const INITIAL_INDEX = 0;

export interface FilterAnalyticsProps {
  onApply: (filters: {transactionType: IncomeExpenseTransaction; groupBy: GroupTransactionsBy}) => void;
}

export const FilterAnalyticsButton: React.FC<FilterAnalyticsProps> = ({onApply}) => {
  const {secondary, card} = useNavigatorThemeColors();
  const [visible, setVisible] = useState(false);

  const {t} = useTranslation();

  const transactionTypes: {type: IncomeExpenseTransaction; label: string}[] = [
    {
      type: TransactionType.Expense,
      label: t('TransactionType.Expense'),
    },
    {
      type: TransactionType.Income,
      label: t('TransactionType.Income'),
    },
  ];
  const [transactionType, setTransactionType] = useState(transactionTypes[INITIAL_INDEX].type);

  const transactionGroups = [
    {
      type: GroupTransactionsBy.Month,
      label: 'Month',
    },
    {
      type: GroupTransactionsBy.Week,
      label: 'Week',
    },
    {
      type: GroupTransactionsBy.Year,
      label: 'Year',
    },
    {
      type: GroupTransactionsBy.Custom,
      label: 'Custom',
    },
  ];
  const [groupBy, setGroupBy] = useState(transactionGroups[INITIAL_INDEX].type);

  return (
    <React.Fragment>
      <Overlay
        isVisible={visible}
        animationType="slide"
        overlayStyle={{backgroundColor: card}}
        fullScreen={true}
        onRequestClose={() => setVisible(false)}>
        <FilterGroup
          options={transactionTypes}
          initialIndex={INITIAL_INDEX}
          onSelect={setTransactionType}
          description={'Transactions'}
        />
        <FilterGroup
          options={transactionGroups}
          initialIndex={INITIAL_INDEX}
          onSelect={setGroupBy}
          description={'Group by period'}
          renderFooter={() =>
            groupBy === GroupTransactionsBy.Custom ? (
              <View style={{flexDirection: 'row'}}>
                <DateField onChange={(v) => {}} />
                <ZenText> - </ZenText>
                <DateField onChange={(v) => {}} />
              </View>
            ) : null
          }
        />
        <ListItem>
          <Button
            title="Apply"
            onPress={() => {
              setVisible(false);
              onApply({groupBy, transactionType});
            }}
            containerStyle={styles.applyButton}
          />
        </ListItem>
      </Overlay>
      <FAB icon={'filter'} style={[styles.fab, {backgroundColor: secondary}]} onPress={() => setVisible((v) => !v)} />
    </React.Fragment>
  );
};

function FilterGroup<T>({
  options,
  initialIndex,
  onSelect,
  description,
  renderFooter,
}: React.PropsWithChildren<{
  options: {type: T; label: string}[];
  initialIndex: number;
  onSelect: (value: T) => void;
  description: string;
  renderFooter?: () => React.ReactElement | null;
}>) {
  const buttons = options.map((tr) => tr.label);
  const [selectedIndex, setSelectedIndex] = useState(initialIndex);

  const onPress = useCallback(
    (index: number) => {
      setSelectedIndex(index);
      onSelect(options[index].type);
    },
    [options, onSelect],
  );

  return (
    <React.Fragment>
      <ListItem topDivider>
        <ListItem.Title>{description}</ListItem.Title>
      </ListItem>
      <ListItem bottomDivider>
        <ListItem.Content>
          <ButtonGroup
            onPress={onPress}
            selectedIndex={selectedIndex}
            buttons={buttons}
            containerStyle={styles.buttons}
          />
          {renderFooter?.()}
        </ListItem.Content>
      </ListItem>
    </React.Fragment>
  );
}

const DateField: React.FC<{value?: Date; onChange: (value: Date) => void}> = ({value, onChange: _onChange}) => {
  value = value ?? new Date();

  const [show, setShow] = useState(false);
  const onChange = (_: any, selectedDate?: Date) => {
    setShow(Platform.OS === 'ios');
    _onChange(selectedDate || value!);
  };

  return (
    <TouchableOpacity onPress={() => setShow((v) => !v)} style={{borderWidth: 1, padding: 4}}>
      <ZenText>{dayjs(value).format('DD MMM YYYY')}</ZenText>
      {show && <DateTimePicker value={value} mode="date" is24Hour={true} display="default" onChange={onChange} />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  buttons: {
    marginHorizontal: 0,
    marginVertical: 0,
  },
  applyButton: {
    flex: 1,
  },
});
