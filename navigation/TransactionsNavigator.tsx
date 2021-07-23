import {createStackNavigator} from '@react-navigation/stack';
import * as React from 'react';
import {useTranslation} from 'react-i18next';
import {TransactionsScreen} from '../screens/transactions';
import {TransactionsParamList} from '../types';
import {EditTransactionScreen} from '../screens/transactions/EditTransactionScreen';
import {TransactionDetailsScreen} from '../screens/transactions/TransactionDetailsScreen';
import {AccountPickerScreen} from '../screens/shared/AccountPickerScreen';

const Stack = createStackNavigator<TransactionsParamList>();

export function TransactionsNavigator() {
  const {t} = useTranslation();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="TransactionsScreen"
        component={TransactionsScreen}
        options={{headerTitle: t('TransactionsScreen.Transactions')}}
      />
      <Stack.Screen name="TransactionDetailsScreen" component={TransactionDetailsScreen} options={{headerTitle: ''}} />
      <Stack.Screen name="EditTransactionScreen" component={EditTransactionScreen} options={{headerTitle: ''}} />
      <Stack.Screen name="AccountPickerScreen" component={AccountPickerScreen} options={{headerTitle: ''}} />
    </Stack.Navigator>
  );
}
