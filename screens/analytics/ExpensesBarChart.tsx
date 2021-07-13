import * as React from 'react';
import {useMemo} from 'react';
import {StyleSheet} from 'react-native';
import {PieChart} from 'react-native-svg-charts';
import {Text, View} from '../../components';
import {LIGHT_GRAY} from '../../constants/Colors';
import {ExpenseModel} from './expense-model';

interface ExpenseData {
  value: number;
  tag?: string | null;
  svg: {fill: string};
}

interface LabelsProps {
  x: any;
  y: any;
  bandwidth: any;
  data: ExpenseData[];
}

export interface ExpensesBarChartProps {
  expenses: ExpenseModel[];
}

export const ExpensesBarChart: React.FC<ExpensesBarChartProps> = (props) => {
  const expenses = useMemo(() => props.expenses.sort((a, b) => b.amount - a.amount), [props.expenses]);
  const totalAmount = useMemo(() => expenses.reduce((acc, curr) => (acc += curr.amount), 0), [expenses]);

  return (
    <React.Fragment>
      {expenses.map((expense) => (
        <ExpenseItem key={expense.id} expense={expense} expenses={expenses} totalAmount={totalAmount} />
      ))}
    </React.Fragment>
  );
};

export interface ExpenseItemProps {
  expense: ExpenseModel;
  expenses: ExpenseModel[];
  totalAmount: number;
}

export const ExpenseItem: React.FC<ExpenseItemProps> = ({expense, expenses, totalAmount}) => {
  const data = useMemo(() => {
    return expenses.map((e) => ({
      key: e.id,
      value: e.amount,
      svg: {fill: e.id === expense.id ? e.color : LIGHT_GRAY},
      arc: {padAngle: 0} as any,
    }));
  }, [expense.id, expenses]);

  const share = useMemo(() => {
    const value = (expense.amount / totalAmount) * 100;
    return value > 1 ? Math.trunc(value) : value.toFixed(1);
  }, [expense.amount, totalAmount]);

  return (
    <View style={styles.container}>
      <View>
        <PieChart innerRadius={12} outerRadius={16} style={styles.pieChart} data={data} />
        <View style={styles.pieChartText}>
          <Text size="tiny">{share}</Text>
        </View>
      </View>
      <Text style={styles.tag}>{expense.tag}</Text>
      <Text>{expense.amountFormatted}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 8,
  },
  pieChart: {height: 48, width: 48},
  pieChartText: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  tag: {
    flex: 1,
  },
});
