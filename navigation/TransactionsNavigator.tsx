import {createStackNavigator} from '@react-navigation/stack';
import * as React from 'react';
import {useTranslation} from 'react-i18next';
import {TransactionDetailsScreen, TransactionsScreen} from '../screens/transactions';
import {TransactionsParamList} from '../types';
import {EditTransactionScreen} from '../screens/transactions/EditTransactionScreen';

const Stack = createStackNavigator<TransactionsParamList>();

export function TransactionsNavigator() {
  const {t} = useTranslation();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="TransactionsScreen"
        component={TransactionsScreen}
        options={{headerTitle: t('Screen.Transactions.Transactions')}}
      />
      <Stack.Screen name="TransactionDetailsScreen" component={TransactionDetailsScreen} options={{headerTitle: ''}} />
      <Stack.Screen name="EditTransactionScreen" component={EditTransactionScreen} options={{headerTitle: ''}} />
    </Stack.Navigator>
  );
}
