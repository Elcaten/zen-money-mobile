import {createStackNavigator} from '@react-navigation/stack';
import * as React from 'react';
import {useTranslation} from 'react-i18next';
import {AccountOverviewScreen, AccountsScreen} from '../screens/account';
import {AccountDetailsScreen} from '../screens/account/AccountDetailsScreen';
import {AccountTypePickerScreen} from '../screens/account/AccountTypePickerScreen';
import {EditAccountScreen} from '../screens/account/EditAccountScreen';
import {InstrumentPickerScreen} from '../screens/shared/InstrumentPickerScreen';
import {AccountsParamList} from '../types';

const Stack = createStackNavigator<AccountsParamList>();

export function AccountsNavigator() {
  const {t} = useTranslation();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AccountsScreen"
        component={AccountsScreen}
        options={{headerTitle: t('Screen.Accounts.Accounts')}}
      />
      <Stack.Screen
        name="AccountOverviewScreen"
        component={AccountOverviewScreen}
        options={{headerTitle: t('Screen.AccountOverview.AccountOverview')}}
      />
      <Stack.Screen name="InstrumentPickerScreen" component={InstrumentPickerScreen} options={{headerTitle: ''}} />
      <Stack.Screen name="AccountTypePickerScreen" component={AccountTypePickerScreen} options={{headerTitle: ''}} />
      <Stack.Screen name="AccountDetailsScreen" component={AccountDetailsScreen} options={{headerTitle: ''}} />
      <Stack.Screen name="EditAccountScreen" component={EditAccountScreen} options={{headerTitle: ''}} />
    </Stack.Navigator>
  );
}
