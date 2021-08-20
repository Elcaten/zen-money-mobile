import dayjs from 'dayjs';
import * as React from 'react';
import {useCallback, useEffect, useMemo, useState} from 'react';
import {
  Dimensions,
  FlatList,
  ListRenderItem,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {TagModel, useInstruments, useMe, useTransactionModels} from '../../api-hooks';
import {View} from '../../components';
import {Card} from '../../components/Card';
import {ZenText} from '../../components/ZenText';
import {useCurrencyFormat} from '../../hooks';
import {argbToHEX, randomColor} from '../../utils';
import {ExpenseModel} from './expense-model';
import {ExpensesBarChart} from './ExpensesBarChart';
import {ExpensesPieChart} from './ExpensesPieChart';

type ExpensesForPeriod<TPeriod> = {
  period: TPeriod;
  expenses: ExpenseModel[];
  totalAmount: string;
};

const MMM_YYYY = 'MMM YYYY';

export const AnalyticsScreen: React.FC<{}> = () => {
  const [currentTagId, setCurrentTagId] = useState<string | null | undefined>(null);

  const {data} = useTransactionModels();
  const transactionsByMonth = useMemo<TransactionsByPeriod<string>>(() => {
    return data
      .filter((t) => t.outcome > 0 && t.income === 0) //TODO: parameter - display income / outcome charts
      .map((t) => ({
        id: t.id,
        amount: t.outcome,
        tag: t.tag,
        parentTag: t.parentTag,
        period: dayjs(t.date).format(MMM_YYYY),
      }))
      .groupBy('period');
  }, [data]);

  const [currentTagTransactionsByMonth, setCurrentTagTransactionsByMonth] = useState<TransactionsByPeriod<string>>(
    new Map(),
  );
  useEffect(() => {
    setCurrentTagTransactionsByMonth(
      transactionsByMonth.mapValues((v) =>
        v.filter((t) => t.tag?.id === currentTagId || t.parentTag?.id === currentTagId),
      ),
    );
  }, [currentTagId, transactionsByMonth]);

  const allModels = useModels(transactionsByMonth, groupByParenTag, sortByMonth, showParentOrOwnTagTitle);
  const currentTagModels = useModels(currentTagTransactionsByMonth, groupByTag, sortByMonth, showTagTitle);
  const models = useMemo(() => (currentTagId === null ? allModels : currentTagModels), [
    allModels,
    currentTagId,
    currentTagModels,
  ]);

  const [currentPage, setCurrentPage] = useState(0);
  const currentPageExpenses = useMemo(() => {
    if (models && models[currentPage] && models[currentPage] && models[currentPage].expenses) {
      return models[currentPage].expenses;
    } else {
      return [];
    }
  }, [currentPage, models]);

  const onScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    let contentOffset = event.nativeEvent.contentOffset;
    let viewSize = event.nativeEvent.layoutMeasurement;

    // Divide the horizontal offset by the width of the view to see which page is visible
    let pageNum = Math.floor(contentOffset.x / viewSize.width);
    setCurrentPage(pageNum);
  };

  const renderItem: ListRenderItem<ExpensesForPeriod<string>> = useCallback(
    ({item: {period, expenses, totalAmount}}) => {
      return (
        <View style={{width: Dimensions.get('window').width}}>
          <ExpensesPieChart expenses={expenses} />
          <View style={styles.pieChartText}>
            <ZenText>{period}</ZenText>
            <ZenText style={styles.totalAmount}>{totalAmount}</ZenText>
          </View>
        </View>
      );
    },
    [],
  );

  return (
    <ScrollView>
      <FlatList
        horizontal
        pagingEnabled
        persistentScrollbar={true}
        data={models}
        renderItem={renderItem}
        keyExtractor={(x) => x.period}
        onMomentumScrollEnd={onScrollEnd}
        // Performance settings
        removeClippedSubviews={true} // Unmount components when outside of window
        initialNumToRender={2} // Reduce initial render amount
        maxToRenderPerBatch={1} // Reduce number in each render batch
        updateCellsBatchingPeriod={100} // Increase time between renders
        windowSize={2} // Reduce the window size
      />
      <Card>
        <ExpensesBarChart
          expenses={currentPageExpenses}
          onItemPress={(v) => setCurrentTagId(v === currentTagId ? null : v)}
        />
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  pieChartText: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  totalAmount: {
    fontSize: 32,
  },
});

type TransactionWithPeriod<TPeriod> = {
  id: string;
  amount: number;
  tag: TagModel | undefined;
  parentTag: TagModel | undefined;
  period: TPeriod;
};
type TransactionsByPeriod<TPeriod> = Map<TPeriod, TransactionWithPeriod<TPeriod>[]>;
type TransactionGroupBy<TPeriod> = (a: TransactionWithPeriod<TPeriod>) => string | undefined;
type TransactionSort<TPeriod> = (a: ExpensesForPeriod<TPeriod>, b: ExpensesForPeriod<TPeriod>) => number;
type TransactionTitleFormat<TPeriod> = (a: TransactionWithPeriod<TPeriod>) => string | undefined;

function useModels<TPeriod>(
  transactionsByPeriod: TransactionsByPeriod<TPeriod>,
  groupBy: TransactionGroupBy<TPeriod>,
  sort: TransactionSort<TPeriod>,
  formatTitle: TransactionTitleFormat<TPeriod>,
) {
  const formatCurrency = useCurrencyFormat();
  const {data: user} = useMe();
  const {data: instruments} = useInstruments();
  const userCurrency = useMemo(() => (user?.currency ? instruments.get(user?.currency)! : undefined), [
    instruments,
    user?.currency,
  ]);

  const [models, setModels] = useState<ExpensesForPeriod<TPeriod>[]>([]);
  useEffect(() => {
    setModels(
      transactionsByPeriod
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
        .mapValues((expenses, period) => ({
          period,
          expenses,
          totalAmount: formatCurrency(
            expenses.reduce((a, c) => (a += c.amount), 0),
            userCurrency?.symbol ?? '',
            0,
          ),
        }))
        .valuesArray()
        .sort(sort),
    );
  }, [formatCurrency, formatTitle, groupBy, sort, transactionsByPeriod, userCurrency?.rate, userCurrency?.symbol]);

  return models;
}

const groupByParenTag: TransactionGroupBy<string> = (x) => x.parentTag?.id ?? x.tag?.id;
const groupByTag: TransactionGroupBy<string> = (x) => x.tag?.id;
const sortByMonth: TransactionSort<string> = ({period: d1}, {period: d2}) =>
  dayjs(d2, MMM_YYYY).unix() - dayjs(d1, MMM_YYYY).unix();
const showParentOrOwnTagTitle: TransactionTitleFormat<string> = (x) => x.parentTag?.title ?? x.tag?.title;
const showTagTitle: TransactionTitleFormat<string> = (x) => x.tag?.title;
