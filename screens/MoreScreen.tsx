import {useNavigation} from '@react-navigation/native';
import * as React from 'react';
import {TagIcon, LogoutIcon} from '../components/Icons';
import {View} from '../components/Themed';
import {ListItem} from '../components_';
import {LOGOUT, TAGS} from '../constants/Strings';

export const MoreScreen: React.FC = () => {
  const nav = useNavigation();

  return (
    <View>
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
