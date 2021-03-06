import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from 'react-native-screens/native-stack';
import * as React from 'react';
import {NotFoundScreen} from '../screens';
import {useNavigatorTheme} from '../themes';
import {RootStackParamList} from '../types';
import BottomTabNavigator from './BottomTabNavigator';
import LinkingConfiguration from './linking-configuration';

export default function Navigation() {
  const navigatorTheme = useNavigatorTheme();

  return (
    <NavigationContainer linking={LinkingConfiguration} theme={navigatorTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Root" component={BottomTabNavigator} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{title: 'Oops!'}} />
    </Stack.Navigator>
  );
}
