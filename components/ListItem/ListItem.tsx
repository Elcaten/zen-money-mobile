import * as React from 'react';
import {ListItem as RNEListItem} from 'react-native-elements';
import {useNavigatorThemeColors} from '../../themes';
import {ListItemSubtitle} from './ListItemSubtitle';
import {ListItemTitle} from './ListItemtTitle';

export type ListItemProps = Parameters<typeof RNEListItem>['0'];

const ListItemComponent: React.FC<ListItemProps> = (props) => {
  const {card} = useNavigatorThemeColors();
  return (
    <RNEListItem
      {...props}
      containerStyle={[
        props.containerStyle,
        {
          backgroundColor: card,
        },
      ]}
    />
  );
};

export const ListItem = Object.assign(ListItemComponent, {
  CheckBox: RNEListItem.CheckBox,
  Chevron: RNEListItem.Chevron,
  Content: RNEListItem.Content,
  Title: ListItemTitle,
  Subtitle: ListItemSubtitle,
});
