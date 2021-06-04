import {createStackNavigator} from '@react-navigation/stack';
import * as React from 'react';
import {useTranslation} from 'react-i18next';
import {IconPickerScreen, LocalesScreen, MoreScreen, TagDetailsScreen, TagsScreen, ThemesScreen} from '../screens/more';
import {MoreParamList} from '../types';

const Stack = createStackNavigator<MoreParamList>();

export const MoreNavigator: React.FC = () => {
  const {t} = useTranslation();

  return (
    <Stack.Navigator>
      <Stack.Screen name="MoreScreen" component={MoreScreen} options={{headerTitle: t('Screen.More')}} />
      <Stack.Screen name="TagsScreen" component={TagsScreen} options={{headerTitle: t('Screen.Tags')}} />
      <Stack.Screen name="ThemesScreen" component={ThemesScreen} options={{headerTitle: t('Screen.Themes.Themes')}} />
      <Stack.Screen name="LocalesScreen" component={LocalesScreen} options={{headerTitle: t('Screen.Locales')}} />
      <Stack.Screen name="TagDetailsScreen" component={TagDetailsScreen} options={{headerTitle: t('Screen.Tag.Tag')}} />
      <Stack.Screen name="IconPickerScreen" component={IconPickerScreen} options={{headerTitle: ''}} />
    </Stack.Navigator>
  );
};
