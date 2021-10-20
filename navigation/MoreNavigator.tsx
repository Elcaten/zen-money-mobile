import {createStackNavigator} from '@react-navigation/stack';
import * as React from 'react';
import {useTranslation} from 'react-i18next';
import {Platform} from 'react-native';
import {IconPickerScreen, LocalesScreen, MoreScreen, TagDetailsScreen, TagsScreen, ThemesScreen} from '../screens/more';
import {SyncAccountSettingsScreen} from '../screens/more/SyncAccountSettingsScreen';
import {SyncSettingsScreen} from '../screens/more/SyncSettingsScreen';
import {SyncTagSettingsScreen} from '../screens/more/SyncTagSettingsScreen';
import {AccountPickerScreen} from '../screens/shared/AccountPickerScreen';
import {InstrumentPickerScreen} from '../screens/shared/InstrumentPickerScreen';
import {TagListPickerScreen} from '../screens/shared/TagListPickerScreen';
import {MoreParamList} from '../types';

const Stack = createStackNavigator<MoreParamList>();

export const MoreNavigator: React.FC = () => {
  const {t} = useTranslation();

  return (
    <Stack.Navigator>
      <Stack.Screen name="MoreScreen" component={MoreScreen} options={{headerTitle: t('MoreScreen.More')}} />
      <Stack.Screen name="ThemesScreen" component={ThemesScreen} options={{headerTitle: t('MoreScreen.Theme')}} />
      <Stack.Screen name="LocalesScreen" component={LocalesScreen} options={{headerTitle: t('MoreScreen.Locales')}} />
      <Stack.Screen name="TagsScreen" component={TagsScreen} options={{headerTitle: t('MoreScreen.Tags')}} />
      <Stack.Screen name="TagDetailsScreen" component={TagDetailsScreen} options={{headerTitle: ''}} />
      <Stack.Screen name="IconPickerScreen" component={IconPickerScreen} options={{headerTitle: ''}} />
      <Stack.Screen
        name="SyncSettingsScreen"
        component={SyncSettingsScreen}
        options={{headerTitle: t('MoreScreen.Sync')}}
      />
      <Stack.Screen
        name="SyncAccountSettingsScreen"
        component={SyncAccountSettingsScreen}
        options={{headerTitle: t('SyncSettingsScreen.AccountSetting')}}
      />
      <Stack.Screen
        name="SyncTagSettingsScreen"
        component={SyncTagSettingsScreen}
        options={{headerTitle: t('SyncSettingsScreen.TagSetting')}}
      />
      <Stack.Screen
        name="InstrumentPickerScreen"
        component={InstrumentPickerScreen}
        options={{headerTitle: t('InstrumentPickerScreen.PickCurrency'), headerShown: Platform.OS === 'ios'}}
      />
      <Stack.Screen
        name="TagListPickerScreen"
        component={TagListPickerScreen}
        options={{headerTitle: t('TagListPickerScreen.PickTag')}}
      />
      <Stack.Screen
        name="AccountPickerScreen"
        component={AccountPickerScreen}
        options={{headerTitle: t('AccountPickerScreen.Accounts')}}
      />
    </Stack.Navigator>
  );
};
