import dayjs from 'dayjs';
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
import {argbToHEX, exhaustiveCheck, randomColor} from '../../utils';
import {IncomeExpenseTransaction, TransactionType} from '../transactions';
import {ExpenseModel} from './expense-model';
import {ExpensesBarChart} from './ExpensesBarChart';
import {ExpensesPieChart} from './ExpensesPieChart';
import {FilterAnalyticsButton, GroupTransactionsBy} from './FilterAnalyticsButton';

const UNCATEGORIZED = 'Uncategorized';

const getGroupName = (groupBy: GroupTransactionsBy, date: dayjs.Dayjs) => {
  switch (groupBy) {
    case GroupTransactionsBy.Month:
      return date.format(MMM_YYYY);
    case GroupTransactionsBy.Week:
      return `${(date as any).week()} ${date.format(YYYY)}`;
    case GroupTransactionsBy.Year:
      return date.format(YYYY);
    case GroupTransactionsBy.Custom:
      throw new Error('Unsupported');
    default:
      exhaustiveCheck(groupBy);
  }
};

const YYYY = 'YYYY';
const MMM_YYYY = 'MMM YYYY';

export const AnalyticsScreen: React.FC<{}> = () => {
  const [currentTagId, setCurrentTagId] = useState<string | null | undefined>(null);
  const [transactionType, setTransactionType] = useState<IncomeExpenseTransaction>(TransactionType.Expense);
  const [groupBy, setGroupBy] = useState<GroupTransactionsBy>(GroupTransactionsBy.Month);

  const {data} = useTransactionModels();
  const incomeTransactions = useMemo(
    () =>
      data
        .filter((t) => t.income > 0 && t.outcome === 0)
        .map((t) => ({
          id: t.id,
          amount: t.income * t.incomeAccount?.instrumentRate!,
          tag: t.tag,
          parentTag: t.parentTag,
          date: dayjs(t.date),
        })),
    [data],
  );
  const expenseTransactions = useMemo(
    () =>
      data
        .filter((t) => t.outcome > 0 && t.income === 0)
        .map((t) => ({
          id: t.id,
          amount: t.outcome * t.outcomeAccount?.instrumentRate!,
          tag: t.tag,
          parentTag: t.parentTag,
          date: dayjs(t.date),
        })),
    [data],
  );
  const transactions = transactionType === TransactionType.Expense ? expenseTransactions : incomeTransactions;

  const transactionGroups = useMemo<TransactionGroups>(() => {
    return transactions
      .map((t) => ({
        id: t.id,
        amount: t.amount,
        tag: t.tag,
        parentTag: t.parentTag,
        groupName: getGroupName(groupBy, t.date),
      }))
      .groupBy('groupName');
  }, [transactions, groupBy]);

  const [currentTagTransactionGroups, setCurrentTagTransactionGroups] = useState<TransactionGroups>(new Map());
  useEffect(() => {
    setCurrentTagTransactionGroups(
      transactionGroups.mapValues((v) =>
        v.filter((t) => t.tag?.id === currentTagId || t.parentTag?.id === currentTagId),
      ),
    );
  }, [currentTagId, transactionGroups]);

  const allModels = useModels(transactionGroups, groupByParenTag, sortByMonth, showParentOrOwnTagTitle);
  const currentTagModels = useModels(currentTagTransactionGroups, groupByTag, sortByMonth, showTagTitle);
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
        onApply={(x) => {
          setGroupBy(x.groupBy);
          setTransactionType(x.transactionType);
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
const sortByMonth: SortFunction = ({groupName: d1}, {groupName: d2}) =>
  dayjs(d2, MMM_YYYY).unix() - dayjs(d1, MMM_YYYY).unix();
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
