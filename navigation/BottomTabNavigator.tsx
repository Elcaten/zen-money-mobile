import {Ionicons} from '@expo/vector-icons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import * as React from 'react';
import {useMemo} from 'react';
import {IconProps} from 'react-native-elements';
import {CreditCardIcon, SwapHorizIcon, MenuIcon, ShowChartIcon} from '../components';
import {AccountsScreen, MoreScreen, TagDetailsScreen, TagsScreen, ThemesScreen, TransactionsScreen} from '../screens/';
import {AnalyticsScreen} from '../screens/AnalyticsScreen';
import {useNavigatorThemeColors} from '../themes';
import {
  AccountsParamList,
  AnalyticsParamList,
  BottomTabParamList,
  MoreParamList,
  TransactionsParamList,
} from '../types';
import {resetTabStackListener} from './resetTabStackListeners';

const iconProps: Omit<IconProps, 'name'> = {
  size: 30,
  style: {marginBottom: -3},
};

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const {tintColor} = useNavigatorThemeColors();
  const tabListeners = useMemo(() => resetTabStackListener(), []);

  return (
    <BottomTab.Navigator initialRouteName="Accounts" tabBarOptions={{activeTintColor: tintColor}}>
      <BottomTab.Screen
        name="Accounts"
        component={AccountsNavigator}
        options={{
          tabBarIcon: ({color}) => <CreditCardIcon {...iconProps} color={color} />,
        }}
        listeners={tabListeners}
      />
      <BottomTab.Screen
        name="Transactions"
        component={TransactionsNavigator}
        options={{
          tabBarIcon: ({color}) => <SwapHorizIcon {...iconProps} color={color} />,
        }}
        listeners={tabListeners}
      />
      <BottomTab.Screen
        name="Analytics"
        component={AnalyticsNavigator}
        options={{
          tabBarIcon: ({color}) => <ShowChartIcon {...iconProps} color={color} />,
        }}
        listeners={tabListeners}
      />
      <BottomTab.Screen
        name="More"
        component={MoreNavigator}
        options={{
          tabBarIcon: ({color}) => <MenuIcon {...iconProps} color={color} />,
        }}
        listeners={tabListeners}
      />
    </BottomTab.Navigator>
  );
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
const AnalyticsStack = createStackNavigator<AnalyticsParamList>();

function AnalyticsNavigator() {
  return (
    <AnalyticsStack.Navigator>
      <AnalyticsStack.Screen name="AnalyticsScreen" component={AnalyticsScreen} options={{headerTitle: 'Analytics'}} />
    </AnalyticsStack.Navigator>
  );
}

const MoreStack = createStackNavigator<MoreParamList>();

function MoreNavigator() {
  return (
    <MoreStack.Navigator>
      <MoreStack.Screen name="MoreScreen" component={MoreScreen} options={{headerTitle: 'More'}} />
      <MoreStack.Screen name="ThemesScreen" component={ThemesScreen} options={{headerTitle: 'Themes'}} />
      <MoreStack.Screen name="TagsScreen" component={TagsScreen} options={{headerTitle: 'Tags'}} />
      <MoreStack.Screen name="TagDetailsScreen" component={TagDetailsScreen} options={{headerTitle: 'Tag'}} />
    </MoreStack.Navigator>
  );
}
