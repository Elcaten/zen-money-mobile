import {Ionicons} from '@expo/vector-icons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import * as React from 'react';
import {useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import {TouchableOpacity, TouchableOpacityBase, Button, TouchableWithoutFeedback} from 'react-native';
import {Icon, IconProps} from 'react-native-elements';
import {HeaderButtons, HeaderButton, Item} from 'react-navigation-header-buttons';
import {CreditCardIcon, SwapHorizIcon, MenuIcon, ShowChartIcon, PieChartIcon} from '../components';
import {
  AccountsScreen,
  LocalesScreen,
  MoreScreen,
  TagDetailsScreen,
  TagsScreen,
  ThemesScreen,
  TransactionsScreen,
  AccountOverviewScreen,
  AnalyticsScreen,
} from '../screens/';
import {useNavigatorThemeColors} from '../themes';
import {
  AccountsParamList,
  AnalyticsParamList,
  BottomTabParamList,
  MoreParamList,
  TransactionsParamList,
} from '../types';
import {resetTabStackListener} from './reset-tab-stack-listeners';

const iconProps: Omit<IconProps, 'name'> = {
  size: 30,
  style: {marginBottom: -3},
};

const tabListeners = resetTabStackListener();

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const {tintColor} = useNavigatorThemeColors();
  const {t} = useTranslation();

  return (
    <BottomTab.Navigator initialRouteName="Accounts" tabBarOptions={{activeTintColor: tintColor}}>
      <BottomTab.Screen
        name="Accounts"
        component={AccountsNavigator}
        options={{
          tabBarIcon: ({color}) => <CreditCardIcon {...iconProps} color={color} />,
          tabBarLabel: t('Tab.Accounts'),
        }}
        listeners={tabListeners}
      />
      <BottomTab.Screen
        name="Transactions"
        component={TransactionsNavigator}
        options={{
          tabBarIcon: ({color}) => <SwapHorizIcon {...iconProps} color={color} />,
          tabBarLabel: t('Tab.Transactions'),
        }}
        listeners={tabListeners}
      />
      <BottomTab.Screen
        name="Analytics"
        component={AnalyticsNavigator}
        options={{
          tabBarIcon: ({color}) => <ShowChartIcon {...iconProps} color={color} />,
          tabBarLabel: t('Tab.Analytics'),
        }}
        listeners={tabListeners}
      />
      <BottomTab.Screen
        name="More"
        component={MoreNavigator}
        options={{
          tabBarIcon: ({color}) => <MenuIcon {...iconProps} color={color} />,
          tabBarLabel: t('Tab.More'),
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
  const {t} = useTranslation();

  return (
    <AccountsStack.Navigator>
      <AccountsStack.Screen
        name="AccountsScreen"
        component={AccountsScreen}
        options={({navigation}) => ({
          headerTitle: t('Screen.Accounts'),
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
      <AccountsStack.Screen
        name="AccountOverviewScreen"
        component={AccountOverviewScreen}
        options={{headerTitle: t('Screen.AccountOverview.AccountOverview')}}
      />
    </AccountsStack.Navigator>
  );
}

const TransactionsStack = createStackNavigator<TransactionsParamList>();

function TransactionsNavigator() {
  const {t} = useTranslation();

  return (
    <TransactionsStack.Navigator>
      <TransactionsStack.Screen
        name="TransactionsScreen"
        component={TransactionsScreen}
        options={{headerTitle: t('Screen.Transactions')}}
      />
    </TransactionsStack.Navigator>
  );
}
const AnalyticsStack = createStackNavigator<AnalyticsParamList>();

function AnalyticsNavigator() {
  const {t} = useTranslation();

  return (
    <AnalyticsStack.Navigator>
      <AnalyticsStack.Screen
        name="AnalyticsScreen"
        component={AnalyticsScreen}
        options={{headerTitle: t('Screen.Analytics')}}
      />
    </AnalyticsStack.Navigator>
  );
}

const MoreStack = createStackNavigator<MoreParamList>();

function MoreNavigator() {
  const {t} = useTranslation();

  return (
    <MoreStack.Navigator>
      <MoreStack.Screen name="MoreScreen" component={MoreScreen} options={{headerTitle: t('Screen.More')}} />
      <MoreStack.Screen name="TagsScreen" component={TagsScreen} options={{headerTitle: t('Screen.Tags')}} />
      <MoreStack.Screen
        name="ThemesScreen"
        component={ThemesScreen}
        options={{headerTitle: t('Screen.Themes.Themes')}}
      />
      <MoreStack.Screen name="LocalesScreen" component={LocalesScreen} options={{headerTitle: t('Screen.Locales')}} />
      <MoreStack.Screen name="TagDetailsScreen" component={TagDetailsScreen} options={{headerTitle: t('Screen.Tag')}} />
    </MoreStack.Navigator>
  );
}
