import * as React from 'react';
import {ListItem as RNEListItem} from 'react-native-elements';
import styled from 'styled-components/native';
import {useNavigatorThemeColors} from '../../themes';
import {ListItemTitle} from './ListItemtTitle';
import {ListItemSubtitle} from './ListItemSubtitle';

type ListItemProps = Parameters<typeof RNEListItem>['0'];

type StyledListItemProps = ListItemProps & {
  color: string | null;
};

const StyledItem = styled<React.FC<StyledListItemProps>>(RNEListItem).attrs(({color}) => ({
  containerStyle: {
    backgroundColor: color,
  },
}))``;

const ListItemComponent: React.FC<ListItemProps> = (props) => {
  const {card} = useNavigatorThemeColors();
  return <StyledItem {...props} color={card} />;
};

export const ListItem = Object.assign(ListItemComponent, {
  CheckBox: RNEListItem.CheckBox,
  Chevron: RNEListItem.Chevron,
  Content: RNEListItem.Content,
  Title: ListItemTitle,
  Subtitle: ListItemSubtitle,
});
