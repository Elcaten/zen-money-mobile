import * as React from 'react';
import {useTranslation} from 'react-i18next';
import {createNativeStackNavigator} from 'react-native-screens/native-stack';
import {TransactionsScreen} from '../screens/transactions';
import {EditTransactionScreen} from '../screens/transactions/EditTransactionScreen';
import {TransactionDetailsScreen} from '../screens/transactions/TransactionDetailsScreen';
import {TransactionsParamList} from '../types';

const Stack = createNativeStackNavigator<TransactionsParamList>();

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
    </Stack.Navigator>
  );
}
