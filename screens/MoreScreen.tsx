import * as React from 'react';
import {View} from 'react-native';
import {LogoutIcon, TagIcon, ThemeIcon} from '../components';
import {ListItem} from '../components/ListItem';
import {LOGOUT, TAGS, THEMES} from '../constants/Strings';
import {MoreScreenProps} from '../types';

export const MoreScreen: React.FC<MoreScreenProps> = ({navigation}) => {
  return (
    <View>
      <ListItem bottomDivider onPress={() => navigation.navigate('ThemesScreen')}>
        <ThemeIcon />
        <ListItem.Content>
          <ListItem.Title>{THEMES}</ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
      <ListItem bottomDivider onPress={() => navigation.navigate('TagsScreen')}>
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
