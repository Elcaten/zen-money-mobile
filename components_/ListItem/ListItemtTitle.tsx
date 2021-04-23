import * as React from 'react';
import {ListItem} from 'react-native-elements';
import styled from 'styled-components/native';

const RNEListItemTitle = ListItem.Title;

type ListItemTitleProps = Parameters<typeof RNEListItemTitle>['0'];

type StyledListItemTitleProps = ListItemTitleProps & {};

const StyledListItemTitle = styled<React.FC<StyledListItemTitleProps>>(RNEListItemTitle)``;

export const ListItemTitle: React.FC<ListItemTitleProps> = (props) => {
  return <StyledListItemTitle {...props} />;
};
