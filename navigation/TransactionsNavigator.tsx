import * as React from 'react';
import {useTranslation} from 'react-i18next';
import {createNativeStackNavigator} from 'react-native-screens/native-stack';
import {AccountPickerScreen} from '../screens/shared/AccountPickerScreen';
import {TransactionsScreen} from '../screens/transactions';
import {EditTransactionScreen} from '../screens/transactions/EditTransactionScreen';
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
      <Stack.Screen name="EditTransactionScreen" component={EditTransactionScreen} options={{headerTitle: ''}} />
      <Stack.Screen
        name="AccountPickerScreen"
        component={AccountPickerScreen}
        options={{headerTitle: t('AccountPickerScreen.Accounts')}}
      />
    </Stack.Navigator>
  );
}
