import {IconProps as ExpoIconProps} from '@expo/vector-icons/build/createIconSet';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import * as React from 'react';
import {useTranslation} from 'react-i18next';
import {CreditCardIcon, MenuIcon, ShowChartIcon, SwapHorizIcon, SyncIcon} from '../components';
import {useNavigatorThemeColors} from '../themes';
import {BottomTabParamList} from '../types';
import {AccountsNavigator} from './AccountsNavigator';
import {AnalyticsNavigator} from './AnalyticsNavigator';
import {MoreNavigator} from './MoreNavigator';
import {resetTabStackListener} from './reset-tab-stack-listeners';
import {SyncNavigator} from './SyncNavigator';
import {TransactionsNavigator} from './TransactionsNavigator';

const iconProps: Omit<ExpoIconProps<string>, 'name'> = {
  size: 30,
  style: {marginBottom: -3},
};

const tabListeners = resetTabStackListener();

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const {primary} = useNavigatorThemeColors();
  const {t} = useTranslation();

  return (
    <BottomTab.Navigator initialRouteName="Accounts" tabBarOptions={{activeTintColor: primary}}>
      <BottomTab.Screen
        name="Accounts"
        component={AccountsNavigator}
        options={{
          tabBarIcon: ({color}) => <CreditCardIcon {...iconProps} color={color} />,
          tabBarLabel: t('BottomTabNavigator.Accounts'),
        }}
        listeners={tabListeners as any}
      />
      <BottomTab.Screen
        name="Sync"
        component={SyncNavigator}
        options={{
          tabBarIcon: ({color}) => <SyncIcon {...iconProps} color={color} />,
          tabBarLabel: t('BottomTabNavigator.Sync'),
        }}
        listeners={tabListeners as any}
      />
      <BottomTab.Screen
        name="Transactions"
        component={TransactionsNavigator}
        options={{
          tabBarIcon: ({color}) => <SwapHorizIcon {...iconProps} color={color} />,
          tabBarLabel: t('BottomTabNavigator.Transactions'),
        }}
        listeners={tabListeners as any}
      />
      <BottomTab.Screen
        name="Analytics"
        component={AnalyticsNavigator}
        options={{
          tabBarIcon: ({color}) => <ShowChartIcon {...iconProps} color={color} />,
          tabBarLabel: t('BottomTabNavigator.Analytics'),
        }}
        listeners={tabListeners as any}
      />
      <BottomTab.Screen
        name="More"
        component={MoreNavigator}
        options={{
          tabBarIcon: ({color}) => <MenuIcon {...iconProps} color={color} />,
          tabBarLabel: t('BottomTabNavigator.More'),
        }}
        listeners={tabListeners as any}
      />
    </BottomTab.Navigator>
  );
}
