import * as React from 'react';
import {useTranslation} from 'react-i18next';
import {createNativeStackNavigator} from 'react-native-screens/native-stack';
import {IconPickerScreen, LocalesScreen, MoreScreen, TagDetailsScreen, TagsScreen, ThemesScreen} from '../screens/more';
import {MoreSyncScreen} from '../screens/more/MoreSyncScreen';
import {InstrumentPickerScreen} from '../screens/shared/InstrumentPickerScreen';
import {MoreParamList} from '../types';

const Stack = createNativeStackNavigator<MoreParamList>();

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
      <Stack.Screen name="InstrumentPickerScreen" component={InstrumentPickerScreen} options={{headerTitle: ''}} />
      <Stack.Screen name="MoreSyncScreen" component={MoreSyncScreen} options={{headerTitle: ''}} />
    </Stack.Navigator>
  );
};
