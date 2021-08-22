import * as React from 'react';
import {createNativeStackNavigator} from 'react-native-screens/native-stack';
import {AnalyticsScreen} from '../screens/analytics';
import {AnalyticsParamList} from '../types';

const Stack = createNativeStackNavigator<AnalyticsParamList>();

export function AnalyticsNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="AnalyticsScreen" component={AnalyticsScreen} options={{headerShown: false}} />
    </Stack.Navigator>
  );
}
