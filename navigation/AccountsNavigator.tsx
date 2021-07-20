import {createStackNavigator} from '@react-navigation/stack';
import * as React from 'react';
import {useTranslation} from 'react-i18next';
import {AccountsScreen} from '../screens/account/AccountsScreen';
import {AccountDetailsScreen} from '../screens/account/AccountDetailsScreen';
import {AccountTypePickerScreen} from '../screens/account/AccountTypePickerScreen';
import {EditAccountScreen} from '../screens/account/EditAccountScreen';
import {InstrumentPickerScreen} from '../screens/shared/InstrumentPickerScreen';
import {AccountsParamList} from '../types';
import {AccountOverviewScreen} from '../screens/account';

const Stack = createStackNavigator<AccountsParamList>();

export function AccountsNavigator() {
  const {t} = useTranslation();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AccountsScreen"
        component={AccountsScreen}
        options={{headerTitle: t('AccountsScreen.Accounts')}}
      />
      <Stack.Screen
        name="AccountOverviewScreen"
        component={AccountOverviewScreen}
        options={{headerTitle: t('AccountOverviewScreen.AccountOverview')}}
      />
      <Stack.Screen name="InstrumentPickerScreen" component={InstrumentPickerScreen} options={{headerTitle: ''}} />
      <Stack.Screen
        name="AccountTypePickerScreen"
        component={AccountTypePickerScreen}
        options={{headerTitle: t('AccountTypePickerScreen.AccountType')}}
      />
      <Stack.Screen name="AccountDetailsScreen" component={AccountDetailsScreen} options={{headerTitle: ''}} />
      <Stack.Screen name="EditAccountScreen" component={EditAccountScreen} options={{headerTitle: ''}} />
    </Stack.Navigator>
  );
}
