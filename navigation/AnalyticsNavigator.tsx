import {createStackNavigator} from '@react-navigation/stack';
import * as React from 'react';
import {useTranslation} from 'react-i18next';
import {AnalyticsScreen} from '../screens/analytics';
import {AnalyticsParamList} from '../types';

const Stack = createStackNavigator<AnalyticsParamList>();

export function AnalyticsNavigator() {
  const {t} = useTranslation();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AnalyticsScreen"
        component={AnalyticsScreen}
        options={{headerTitle: t('AnalyticsScreen.Analytics')}}
      />
    </Stack.Navigator>
  );
}
