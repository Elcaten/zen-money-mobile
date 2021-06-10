import {Ionicons} from '@expo/vector-icons';
import {createStackNavigator} from '@react-navigation/stack';
import * as React from 'react';
import {useTranslation} from 'react-i18next';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import {AccountOverviewScreen, AccountsScreen} from '../screens/account';
import {AccountDetailsScreen} from '../screens/account/AccountDetailsScreen';
import {AccountsParamList} from '../types';
import {EditAccountScreen} from '../screens/account/EditAccountScreen';
import {InstrumentPickerScreen} from '../screens/account/InstrumentPickerScreen';

const Stack = createStackNavigator<AccountsParamList>();

export function AccountsNavigator() {
  const {t} = useTranslation();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AccountsScreen"
        component={AccountsScreen}
        options={({navigation}) => ({
          headerTitle: t('Screen.Accounts.Accounts'),
          headerRight: () => (
            <HeaderButtons>
              <Item
                title={t('Screen.AccountOverview.AccountOverview')}
                IconComponent={Ionicons}
                iconName="pie-chart-outline"
                iconSize={24}
                onPress={() => navigation.navigate('AccountOverviewScreen')}
              />
            </HeaderButtons>
          ),
        })}
      />
      <Stack.Screen
        name="AccountOverviewScreen"
        component={AccountOverviewScreen}
        options={{headerTitle: t('Screen.AccountOverview.AccountOverview')}}
      />
      <Stack.Screen name="InstrumentPickerScreen" component={InstrumentPickerScreen} options={{headerTitle: ''}} />
      <Stack.Screen name="AccountDetailsScreen" component={AccountDetailsScreen} options={{headerTitle: ''}} />
      <Stack.Screen name="EditAccountScreen" component={EditAccountScreen} options={{headerTitle: ''}} />
    </Stack.Navigator>
  );
}
