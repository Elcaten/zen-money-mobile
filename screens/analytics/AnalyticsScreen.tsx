import dayjs from 'dayjs';
import * as React from 'react';
import {useMemo} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {useInstruments, useMe, useTransactionModels} from '../../api-hooks';
import {Text, View} from '../../components';
import {useCurrencyFormat} from '../../hooks';
import {ViewPager} from '../../lib/react-native-ui-kitten';
import {argbToHEX, randomColor} from '../../utils';
import {ExpenseModel} from './expense-model';
import {ExpensesBarChart} from './ExpensesBarChart';
import {ExpensesPieChart} from './ExpensesPieChart';

export interface AnalyticsScreenProps {}

export const AnalyticsScreen: React.FC<AnalyticsScreenProps> = (props) => {
  const {data} = useTransactionModels();
  const transactionsByMonth = useMemo(() => {
    return data.map((t) => ({...t, month: dayjs(t.date).format('MMM YYYY')})).groupBy('month');
  }, [data]);

  const formatCurrency = useCurrencyFormat();
  const {data: user} = useMe();
  const {data: instruments} = useInstruments();
  const userCurrency = useMemo(() => (user?.currency ? instruments.get(user?.currency)! : undefined), [
    instruments,
    user?.currency,
  ]);

  const models = useMemo(() => {
    return transactionsByMonth
      .mapValues((transactions) => {
        return transactions
          .filter((t) => t.outcome > 0 && t.income === 0)
          .map((x) => ({
            ...x,
            effectiveTagTitle: x.parentTag?.title ?? x.tag?.title,
            effectiveTag: x.parentTag ?? x.tag,
          }))
          .groupBy('effectiveTagTitle')
          .mapValues((v) =>
            v.reduce<ExpenseModel>(
              (a, c) => {
                const amount = a.amount + c.outcome / userCurrency?.rate!;
                return {
                  id: c.id,
                  tag: c.effectiveTagTitle,
                  tagIcon: c.effectiveTag?.icon,
                  amount: amount,
                  amountFormatted: formatCurrency(amount, userCurrency?.symbol, 0),
                  color: c.effectiveTag?.iconColor ? argbToHEX(c.effectiveTag?.iconColor) : randomColor(),
                };
              },
              {amount: 0, id: '', color: '', amountFormatted: ''},
            ),
          )
          .valuesArray();
      })
      .mapValues((expenses) => ({
        expenses,
        totalAmount: formatCurrency(
          expenses.reduce((a, c) => (a += c.amount), 0),
          userCurrency?.symbol,
          0,
        ),
      }))
      .entriesArray()
      .sort(([d1], [d2]) => {
        return dayjs(d2, 'MMM YYYY').unix() - dayjs(d1, 'MMM YYYY').unix();
      });
  }, [formatCurrency, userCurrency, transactionsByMonth]);

  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const shouldLoadComponent = (index: number) => index === selectedIndex;

  return (
    <ViewPager
      selectedIndex={selectedIndex}
      shouldLoadComponent={shouldLoadComponent}
      onSelect={(index) => setSelectedIndex(index)}>
      {models.map(([month, {expenses, totalAmount}]) => (
        <ScrollView key={`${month}`}>
          <ExpensesPieChart expenses={expenses}>
            <View style={styles.pieChartText}>
              <Text>{month}</Text>
              <Text style={styles.totalAmount}>{totalAmount}</Text>
            </View>
          </ExpensesPieChart>
          <ExpensesBarChart expenses={expenses} />
        </ScrollView>
      ))}
    </ViewPager>
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
    fontSize: 42,
  },
});
