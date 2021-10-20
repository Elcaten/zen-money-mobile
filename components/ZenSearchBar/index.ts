import {Platform} from 'react-native';
import {ZenSearchBarDefault} from './ZenSearchBarDefault';
import {ZenSearchBarAndroid, ZenSearchBarAndroidProps} from './ZenSearchBarAndroid';
import {ZenSearchBarIos, ZenSearchBarIosProps} from './ZenSearchBarIOS';

export const ZenSearchBar = Platform.select({
  ios: ZenSearchBarIos,
  android: ZenSearchBarAndroid,
  default: ZenSearchBarDefault as any,
}) as React.FC<ZenSearchBarAndroidProps & ZenSearchBarIosProps>;
