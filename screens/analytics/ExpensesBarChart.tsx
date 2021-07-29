import * as React from 'react';
import {useMemo} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {PieChart} from 'react-native-svg-charts';
import {View} from '../../components';
import {GRAY_300, GRAY_800} from '../../constants/Colors';
import {useNavigatorTheme} from '../../themes';
import {ExpenseModel} from './expense-model';
import {ZenText} from '../../components/ZenText';

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
  onItemPress: (tagId: string | undefined) => void;
}

export const ExpensesBarChart: React.FC<ExpensesBarChartProps> = (props) => {
  const expenses = useMemo(() => props.expenses.sort((a, b) => b.amount - a.amount), [props.expenses]);
  const totalAmount = useMemo(() => expenses.reduce((acc, curr) => (acc += curr.amount), 0), [expenses]);

  return (
    <React.Fragment>
      {expenses.map((expense) => (
        <ExpenseItem
          key={expense.id}
          expense={expense}
          expenses={expenses}
          totalAmount={totalAmount}
          onPress={() => props.onItemPress(expense.tagId)}
        />
      ))}
    </React.Fragment>
  );
};

export interface ExpenseItemProps {
  expense: ExpenseModel;
  expenses: ExpenseModel[];
  totalAmount: number;
  onPress: () => void;
}

export const ExpenseItem: React.FC<ExpenseItemProps> = ({expense, expenses, totalAmount, onPress}) => {
  const {dark} = useNavigatorTheme();
  const data = useMemo(() => {
    return expenses.map((e) => ({
      key: e.id,
      value: e.amount,
      svg: {fill: e.id === expense.id ? e.color : dark ? GRAY_800 : GRAY_300},
      arc: {padAngle: 0} as any,
    }));
  }, [expenses, expense.id, dark]);

  const share = useMemo(() => {
    const value = (expense.amount / totalAmount) * 100;
    return value > 1 ? Math.trunc(value) : value.toFixed(1);
  }, [expense.amount, totalAmount]);

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View>
        <PieChart innerRadius={12} outerRadius={16} style={styles.pieChart} data={data} />
        <View style={styles.pieChartText}>
          <ZenText size="tiny">{share}</ZenText>
        </View>
      </View>
      <ZenText style={styles.tag}>{expense.title}</ZenText>
      <ZenText>{expense.amountFormatted}</ZenText>
    </TouchableOpacity>
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
