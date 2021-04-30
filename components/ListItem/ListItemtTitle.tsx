import * as React from 'react';
import {ListItem} from 'react-native-elements';
import {useNavigatorThemeColors} from '../../themes';

type ListItemTitleProps = Parameters<typeof ListItem.Title>['0'];

export const ListItemTitle: React.FC<ListItemTitleProps> = (props) => {
  const {text} = useNavigatorThemeColors();
  return <ListItem.Title {...props} style={[props.style, {color: text}]} />;
};
