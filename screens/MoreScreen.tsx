import {useNavigation} from '@react-navigation/native';
import * as React from 'react';
import {View} from 'react-native';
import {TagIcon, LogoutIcon} from '../components/Icons';
import {ListItem} from '../components/ListItem';
import {LOGOUT, TAGS} from '../constants/Strings';
import {useThemeToggle} from '../themes';
import {CheckboxListItem} from '../components/ListItem/CheckboxListItem';

export const MoreScreen: React.FC = () => {
  const nav = useNavigation();
  const {isDarkThemeEnabled, toggleTheme} = useThemeToggle();

  return (
    <View>
      <CheckboxListItem title="Dark theme" checked={isDarkThemeEnabled} onPress={toggleTheme} />

      <ListItem bottomDivider onPress={() => nav.navigate('TagsScreen')}>
        <TagIcon />
        <ListItem.Content>
          <ListItem.Title>{TAGS}</ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
      <ListItem bottomDivider>
        <LogoutIcon />
        <ListItem.Content>
          <ListItem.Title>{LOGOUT}</ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
    </View>
  );
};
