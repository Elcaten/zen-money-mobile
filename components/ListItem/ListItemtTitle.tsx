import * as React from 'react';
import {ListItem} from 'react-native-elements';
import styled from 'styled-components/native';
import {useNavigatorThemeColors} from '../../themes';

const RNEListItemTitle = ListItem.Title;

type ListItemTitleProps = Parameters<typeof RNEListItemTitle>['0'];

type StyledListItemTitleProps = ListItemTitleProps & {
  color: string | null;
};

const StyledListItemTitle = styled<React.FC<StyledListItemTitleProps>>(RNEListItemTitle)`
  color: ${({color}) => color};
`;

export const ListItemTitle: React.FC<ListItemTitleProps> = (props) => {
  const {text} = useNavigatorThemeColors();
  return <StyledListItemTitle {...props} color={text} />;
};
