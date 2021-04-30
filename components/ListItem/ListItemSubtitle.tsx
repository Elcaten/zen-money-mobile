import * as React from 'react';
import {ListItem} from 'react-native-elements';
import {useNavigatorThemeColors} from '../../themes';

type ListItemSubtitleProps = Parameters<typeof ListItem.Subtitle>['0'];

export const ListItemSubtitle: React.FC<ListItemSubtitleProps> = (props) => {
  const {text} = useNavigatorThemeColors();
  return <ListItem.Subtitle style={{color: text}} {...props} />;
};
