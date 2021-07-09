import * as React from 'react';
import {useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import {ScrollView} from 'react-native';
import {useMe} from '../../api-hooks';
import {useLogout} from '../../auth';
import {ThemeIcon} from '../../components';
import {ListItem} from '../../components/ListItem';
import {MoreScreenProps} from '../../types';

interface MoreScreenListItem {
  title: string;
  onPress: () => void;
}

export const MoreScreen: React.FC<MoreScreenProps> = ({navigation}) => {
  const {t} = useTranslation();
  const logout = useLogout();

  // useNotifications();

  const options = useMemo<MoreScreenListItem[]>(
    () => [
      {
        title: t('Screen.Themes.Themes'),
        onPress: () => navigation.navigate('ThemesScreen'),
      },
      {
        title: t('Screen.Locales'),
        onPress: () => navigation.navigate('LocalesScreen'),
      },
      {
        title: t('Screen.Tags'),
        onPress: () => navigation.navigate('TagsScreen', {}),
      },
      {
        title: t('Screen.AccountSettings.AccountSettings'),
        onPress: () => navigation.navigate('AccountSettingsScreen'),
      },
      {
        title: t('SignOut'),
        onPress: logout,
      },
      // {
      //   title: 'Schedule notification',
      //   onPress: async () => {
      //     await schedulePushNotification();
      //   },
      // },
    ],
    // .map((x) => [x, x, x, x])
    // .flatten(),
    [logout, navigation, t],
  );

  // const user = useMe();

  return (
    // <CollapsibleHeaderScrollView headerHeight={56} HeaderComponent={Header}>
    <ScrollView>
      {/* <StatusBar backgroundColor="white" /> */}
      {/* <ListItem>
        <ListItem.Content>
          <ListItem.Title>{user.data?.login}</ListItem.Title>
        </ListItem.Content>
      </ListItem> */}
      {options.map(({title, onPress}, idx) => (
        <ListItem key={idx} bottomDivider onPress={onPress}>
          <ThemeIcon />
          <ListItem.Content>
            <ListItem.Title>{title}</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
      ))}
    </ScrollView>
    // </CollapsibleHeaderScrollView>
  );
};

// const Header: React.FC = () => {
//   return (
//     <Card style={styles.container}>
//       <Text>Collapsed</Text>
//     </Card>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     height: 56,
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 4,
//     elevation: 4,
//   },
// });
