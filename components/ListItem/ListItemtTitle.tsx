import * as React from 'react';
import {useMemo} from 'react';
import {ListItem} from 'react-native-elements';
import {useNavigatorThemeColors} from '../../themes';

type ListItemTitleProps = Parameters<typeof ListItem.Title>['0'];

export const ListItemTitle: React.FC<ListItemTitleProps> = (props) => {
  const {text} = useNavigatorThemeColors();
  const baseStyles = useMemo(() => ({color: text, fontSize: 16}), [text]);

  return <ListItem.Title {...props} style={[baseStyles, props.style]} />;
};
