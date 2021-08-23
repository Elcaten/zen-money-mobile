import * as React from 'react';
import {useCallback, useEffect, useMemo, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {ScrollView, StyleSheet} from 'react-native';
import {Button} from 'react-native-elements';
import {SafeAreaView} from 'react-native-safe-area-context';
import {TagModel, useInstruments, useMe, useTransactionModels} from '../../api-hooks';
import {ChevronLeftIcon, ChevronRightIcon, View} from '../../components';
import {Card} from '../../components/Card';
import {ZenText} from '../../components/ZenText';
import {useCurrencyFormat, useDebounce} from '../../hooks';
import {argbToHEX, randomColor} from '../../utils';
import {ExpenseModel} from './expense-model';
import {ExpensesBarChart} from './ExpensesBarChart';
import {ExpensesPieChart} from './ExpensesPieChart';
import {FilterName, filters} from './filter-funcs';
import {FilterAnalyticsButton} from './FilterAnalyticsButton/FilterAnalyticsButton';
import {GroupName, grouppings} from './group-funcs';
import {SortName, sorts} from './sort-funcs';

const UNCATEGORIZED = 'Uncategorized';

export const AnalyticsScreen: React.FC<{}> = () => {
  const [currentTagId, setCurrentTagId] = useState<string | null | undefined>(null);

  const [filterName, setFilterName] = useState<FilterName>('Expense');
  const [groupName, setGroupName] = useState<GroupName>('ByMonth');
  const [sortName, setSortName] = useState<SortName>('ByMonth');

  const {data} = useTransactionModels();

  const transactions = useMemo(() => filters[filterName](data ?? []), [data, filterName]);

  const transactionGroups = useMemo<TransactionGroups>(() => {
    const getGroupName = grouppings[groupName];
    return transactions
      .map((t) => ({
        id: t.id,
        amount: t.amount,
        tag: t.tag,
        parentTag: t.parentTag,
        groupName: getGroupName(t),
      }))
      .groupBy('groupName');
  }, [transactions, groupName]);

  const [currentTagTransactionGroups, setCurrentTagTransactionGroups] = useState<TransactionGroups>(new Map());
  useEffect(() => {
    setCurrentTagTransactionGroups(
      transactionGroups.mapValues((v) =>
        v.filter((t) => t.tag?.id === currentTagId || t.parentTag?.id === currentTagId),
      ),
    );
  }, [currentTagId, transactionGroups]);

  const allModels = useModels(transactionGroups, groupByParenTag, sorts[sortName], showParentOrOwnTagTitle);
  const currentTagModels = useModels(currentTagTransactionGroups, groupByTag, sorts[sortName], showTagTitle);
  const models = currentTagId === null ? allModels : currentTagModels;

  const [currentPage, setCurrentPage] = useState(0);
  const currentPageDebounced = useDebounce(currentPage, 150);

  const {t} = useTranslation();

  const onItemPress = useCallback((v) => setCurrentTagId(v === currentTagId ? null : v), [currentTagId]);

  return (
    <SafeAreaView style={styles.flexFill}>
      <ScrollView>
        <Card style={{elevation: 4}}>
          <ZenText size="giant" style={styles.headerTitle}>
            {t('AnalyticsScreen.Analytics')}
          </ZenText>
          <View style={styles.flexRow}>
            <Button
              type="clear"
              icon={<ChevronLeftIcon size={32} />}
              containerStyle={styles.pieChartButton}
              onPress={() => setCurrentPage((v) => (v > 0 ? v - 1 : v))}
              disabled={currentPage <= 0}
            />
            <View style={styles.flexFill}>
              <ExpensesPieChart expenses={models[currentPage]?.expenses ?? []} />
              <View style={styles.pieChartText}>
                <ZenText>{models[currentPage]?.groupName}</ZenText>
                <ZenText style={styles.totalAmount}>{models[currentPage]?.totalAmount}</ZenText>
              </View>
            </View>
            <Button
              type="clear"
              icon={<ChevronRightIcon size={32} />}
              containerStyle={styles.pieChartButton}
              onPress={() => setCurrentPage((v) => (v < models.length - 1 ? v + 1 : v))}
              disabled={currentPage >= models.length - 1}
            />
          </View>
        </Card>
        <Card style={styles.barChartWrapper}>
          <ExpensesBarChart expenses={models[currentPageDebounced]?.expenses ?? []} onItemPress={onItemPress} />
        </Card>
      </ScrollView>
      <FilterAnalyticsButton
        filterName={filterName}
        groupName={groupName}
        sortName={sortName}
        onApply={(x) => {
          setFilterName(x.filterName);
          setGroupName(x.groupName);
          setSortName(x.sortName);
        }}
      />
    </SafeAreaView>
  );
};

type TransactionGroup = {
  id: string;
  amount: number;
  tag: TagModel | undefined;
  parentTag: TagModel | undefined;
  groupName: string;
};
type TransactionGroups = Map<string, TransactionGroup[]>;
type GroupFunction = (a: TransactionGroup) => string | undefined;
type SortFunction = (a: ExpensesGroup, b: ExpensesGroup) => number;
type FormatTitleFunction = (a: TransactionGroup) => string | undefined;
type ExpensesGroup = {
  groupName: string;
  expenses: ExpenseModel[];
  totalAmount: string;
};

function useModels(
  transactionGroups: TransactionGroups,
  groupBy: GroupFunction,
  sorter: SortFunction,
  formatTitle: FormatTitleFunction,
) {
  const formatCurrency = useCurrencyFormat();
  const {data: user} = useMe();
  const {data: instruments} = useInstruments();
  const userCurrency = useMemo(() => (user?.currency ? instruments.get(user?.currency)! : undefined), [
    instruments,
    user?.currency,
  ]);

  const [models, setModels] = useState<ExpensesGroup[]>([]);
  useEffect(() => {
    setModels(
      transactionGroups
        .mapValues((transactions) =>
          transactions
            .groupBy(groupBy)
            .mapValues<ExpenseModel>((v) => {
              const amount = v.reduce((acc, curr) => acc + curr.amount / userCurrency?.rate!, 0);
              const amountFormatted = formatCurrency(amount, userCurrency?.symbol ?? '', 0);
              const expense = v[0];
              return {
                amount,
                amountFormatted,
                id: expense.id,
                color: expense.tag?.iconColor ? argbToHEX(expense.tag?.iconColor) : randomColor(),
                title: formatTitle(expense),
                tagId: expense.parentTag?.id ?? expense.tag?.id,
              };
            })
            .valuesArray(),
        )
        .mapValues((expenses, groupName) => ({
          groupName,
          expenses,
          totalAmount: formatCurrency(
            expenses.reduce((a, c) => (a += c.amount), 0),
            userCurrency?.symbol ?? '',
            0,
          ),
        }))
        .valuesArray()
        .sort(sorter),
    );
  }, [formatCurrency, formatTitle, groupBy, sorter, transactionGroups, userCurrency?.rate, userCurrency?.symbol]);

  return models;
}

const groupByParenTag: GroupFunction = (x) => x.parentTag?.id ?? x.tag?.id;
const groupByTag: GroupFunction = (x) => x.tag?.id;
const showParentOrOwnTagTitle: FormatTitleFunction = (x) => x.parentTag?.title ?? x.tag?.title ?? UNCATEGORIZED;
const showTagTitle: FormatTitleFunction = (x) => x.tag?.title ?? UNCATEGORIZED;

const styles = StyleSheet.create({
  headerTitle: {
    alignSelf: 'center',
    paddingTop: 16,
  },
  flexFill: {
    flex: 1,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pieChartText: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  pieChartButton: {
    borderRadius: 100,
    margin: 8,
  },
  totalAmount: {
    fontSize: 32,
  },
  barChartWrapper: {
    marginBottom: 64, // Make last item accessible over FAB
  },
});
