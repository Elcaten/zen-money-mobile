import {Ionicons} from '@expo/vector-icons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import * as React from 'react';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import {AccountsScreen, MoreScreen, TagDetailsScreen, TagsScreen, TransactionsScreen} from '../screens/';
import {AccountsParamList, BottomTabParamList, MoreParamList, TransactionsParamList} from '../types';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator initialRouteName="Accounts" tabBarOptions={{activeTintColor: Colors[colorScheme].tint}}>
      <BottomTab.Screen
        name="Accounts"
        component={AccountsNavigator}
        options={{
          tabBarIcon: ({color}) => <TabBarIcon name="ios-code" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Transactions"
        component={TransactionsNavigator}
        options={{
          tabBarIcon: ({color}) => <TabBarIcon name="ios-code" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="More"
        component={MoreNavigator}
        options={{
          tabBarIcon: ({color}) => <TabBarIcon name="ios-code" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

function TabBarIcon(props: {name: React.ComponentProps<typeof Ionicons>['name']; color: string}) {
  return <Ionicons size={30} style={{marginBottom: -3}} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const AccountsStack = createStackNavigator<AccountsParamList>();

function AccountsNavigator() {
  return (
    <AccountsStack.Navigator>
      <AccountsStack.Screen name="AccountsScreen" component={AccountsScreen} options={{headerTitle: 'Accounts'}} />
    </AccountsStack.Navigator>
  );
}

const TransactionsStack = createStackNavigator<TransactionsParamList>();

function TransactionsNavigator() {
  return (
    <TransactionsStack.Navigator>
      <TransactionsStack.Screen
        name="TransactionsScreen"
        component={TransactionsScreen}
        options={{headerTitle: 'Transactions'}}
      />
    </TransactionsStack.Navigator>
  );
}

const MoreStack = createStackNavigator<MoreParamList>();

function MoreNavigator() {
  return (
    <MoreStack.Navigator>
      <MoreStack.Screen name="MoreScreen" component={MoreScreen} options={{headerTitle: 'More'}} />
      <MoreStack.Screen name="TagsScreen" component={TagsScreen} options={{headerTitle: 'Tags'}} />
      <MoreStack.Screen name="TagDetailsScreen" component={TagDetailsScreen} options={{headerTitle: 'Tag'}} />
    </MoreStack.Navigator>
  );
}
