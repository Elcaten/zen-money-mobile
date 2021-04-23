import * as React from 'react';
import {ListItem as RNEListItem} from 'react-native-elements';
import styled from 'styled-components/native';
import {ListItemTitle} from './ListItemtTitle';

type ListItemProps = Parameters<typeof RNEListItem>['0'];

type StyledListItemProps = ListItemProps & {};

const StyledItem = styled<React.FC<StyledListItemProps>>(RNEListItem)``;

const ListItemComponent: React.FC<ListItemProps> = (props) => {
  return <StyledItem {...props} />;
};

export const ListItem = Object.assign(ListItemComponent, {
  CheckBox: RNEListItem.CheckBox,
  Chevron: RNEListItem.Chevron,
  Content: RNEListItem.Content,
  Title: ListItemTitle,
});
