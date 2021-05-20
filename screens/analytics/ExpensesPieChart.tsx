import * as React from 'react';
import {StyleSheet} from 'react-native';
import {PieChart} from 'react-native-svg-charts';
import {View} from '../../components';
import {randomColor} from '../../utils';
import {ExpenseModel} from './expense-model';

interface ExpenseData {
  value: number;
  svg: {fill: string};
  key: string;
}

export interface ExpensesChartProps {
  expenses: ExpenseModel[];
}

export const ExpensesPieChart: React.FC<ExpensesChartProps> = ({expenses, children}) => {
  const pieData = expenses
    .filter((value) => value.amount > 0)
    .map<ExpenseData>((value, index) => ({
      value: value.amount,
      svg: {fill: value.color ?? randomColor()},
      key: `pie-${index}`,
      arc: {padAngle: 0} as any,
    }));

  return (
    <View>
      <PieChart style={styles.pieChart} data={pieData} innerRadius={75} outerRadius={100} />
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  pieChart: {height: 240},
});
