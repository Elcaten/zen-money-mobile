import * as React from 'react';
import {useTranslation} from 'react-i18next';
import {View} from 'react-native';
import {useLogout} from '../../auth';
import {LogoutIcon, TagIcon, ThemeIcon} from '../../components';
import {ListItem} from '../../components/ListItem';
import {MoreScreenProps} from '../../types';

export const MoreScreen: React.FC<MoreScreenProps> = ({navigation}) => {
  const {t} = useTranslation();
  const logout = useLogout();

  // useNotifications();

  return (
    <View>
      <ListItem bottomDivider onPress={() => navigation.navigate('ThemesScreen')}>
        <ThemeIcon />
        <ListItem.Content>
          <ListItem.Title>{t('Screen.Themes.Themes')}</ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
      <ListItem bottomDivider onPress={() => navigation.navigate('LocalesScreen')}>
        <ThemeIcon />
        <ListItem.Content>
          <ListItem.Title>{t('Screen.Locales')}</ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
      <ListItem bottomDivider onPress={() => navigation.navigate('TagsScreen', {})}>
        <TagIcon />
        <ListItem.Content>
          <ListItem.Title>{t('Screen.Tags')}</ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
      <ListItem bottomDivider onPress={logout}>
        <LogoutIcon />
        <ListItem.Content>
          <ListItem.Title>{t('SignOut')}</ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
      {/* <ListItem>
        <Button
          title="Schedule notification"
          onPress={async () => {
            await schedulePushNotification();
          }}
        />
      </ListItem> */}
    </View>
  );
};
