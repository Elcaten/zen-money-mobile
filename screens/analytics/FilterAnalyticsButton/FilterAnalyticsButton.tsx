import * as React from 'react';
import {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Modal, StyleSheet} from 'react-native';
import {Button} from 'react-native-elements';
import {FAB} from 'react-native-paper';
import {View} from '../../../components';
import {ZenFormSheet} from '../../../components/ZenFormSheet';
import {useNavigatorThemeColors} from '../../../themes';
import {FilterName} from '../filter-funcs';
import {GroupName} from '../group-funcs';
import {SortName} from '../sort-funcs';
import {SegmentedFilter} from './SegmentedFilter';

export interface FilterAnalyticsProps {
  filterName: FilterName;
  groupName: GroupName;
  sortName: SortName;
  onApply: (params: {filterName: FilterName; groupName: GroupName; sortName: SortName}) => void;
}

export const FilterAnalyticsButton: React.FC<FilterAnalyticsProps> = (props) => {
  const {secondary, card} = useNavigatorThemeColors();
  const {t} = useTranslation();

  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!visible) {
      setFilterName(props.filterName);
      setGroupName(props.groupName);
      setSortName(props.sortName);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  const [filterName, setFilterName] = useState(props.filterName);
  useEffect(() => setFilterName(props.filterName), [props.filterName]);

  const [groupName, setGroupName] = useState(props.groupName);
  useEffect(() => setGroupName(props.groupName), [props.groupName]);

  const [sortName, setSortName] = useState(props.sortName);
  useEffect(() => setSortName(props.sortName), [props.sortName]);

  const filterButtons: {filterName: FilterName; title: string}[] = [
    {
      filterName: 'Expense',
      title: t('TransactionType.Expense'),
    },
    {
      filterName: 'Income',
      title: t('TransactionType.Income'),
    },
  ];

  const groupByButtons: {groupName: GroupName; sortName: SortName; title: string}[] = [
    {
      groupName: 'ByWeek',
      sortName: 'ByWeek',
      title: 'Week',
    },
    {
      groupName: 'ByMonth',
      sortName: 'ByMonth',
      title: 'Month',
    },
    {
      groupName: 'ByYear',
      sortName: 'ByYear',
      title: 'Year',
    },
    // {
    //   groupName: 'Custom',
    //   sortName: 'Custom',
    //   title: 'Custom',
    // },
  ];

  return (
    <React.Fragment>
      <FAB icon={'filter'} style={[styles.fab, {backgroundColor: secondary}]} onPress={() => setVisible((v) => !v)} />
      <ZenFormSheet visible={visible} onRequestClose={() => setVisible(false)}>
        <View style={styles.header}>
          <Button
            title="Cancel"
            type="clear"
            onPress={() => {
              setVisible(false);
            }}
          />
          <Button
            title="Apply"
            type="clear"
            onPress={() => {
              setVisible(false);
              props.onApply({filterName, groupName, sortName});
            }}
          />
        </View>
        <SegmentedFilter
          buttons={filterButtons.map((b) => b.title)}
          selectedIndex={filterButtons.findIndex((b) => b.filterName === filterName)}
          onSelect={(idx) => setFilterName(filterButtons[idx].filterName)}
          description={'Transactions'}
        />
        <SegmentedFilter
          buttons={groupByButtons.map((b) => b.title)}
          selectedIndex={groupByButtons.findIndex((b) => b.groupName === groupName)}
          onSelect={(idx) => {
            setGroupName(groupByButtons[idx].groupName);
            setSortName(groupByButtons[idx].sortName);
          }}
          description={'Group by period'}
          // renderFooter={() =>
          //   groupName === 'Custom' ? (
          //     <View style={{flexDirection: 'row'}}>
          //       <DateField onChange={(v) => {}} />
          //       <ZenText> - </ZenText>
          //       <DateField onChange={(v) => {}} />
          //     </View>
          //   ) : null
          // }
        />
      </ZenFormSheet>
    </React.Fragment>
  );
};

export const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    padding: 8,
    justifyContent: 'space-between',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
