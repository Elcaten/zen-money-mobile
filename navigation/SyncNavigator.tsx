import {createStackNavigator} from '@react-navigation/stack';
import * as React from 'react';
import {useTranslation} from 'react-i18next';
import {SyncScreen} from '../screens/sync/SyncScreen';
import {SyncParamList} from '../types';

const Stack = createStackNavigator<SyncParamList>();

export function SyncNavigator() {
  const {t} = useTranslation();

  return (
    <Stack.Navigator>
      <Stack.Screen name="SyncScreen" component={SyncScreen} />
    </Stack.Navigator>
  );
}
