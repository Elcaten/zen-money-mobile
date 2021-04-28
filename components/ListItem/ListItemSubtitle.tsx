import * as React from 'react';
import {ListItem} from 'react-native-elements';
import styled from 'styled-components/native';
import {useNavigatorThemeColors} from '../../themes';

const RNEListItemSubtitle = ListItem.Subtitle;

type ListItemSubtitleProps = Parameters<typeof RNEListItemSubtitle>['0'];

type StyledListItemSubtitleProps = ListItemSubtitleProps & {
  color: string | null;
};

const StyledListItemSubtitle = styled<React.FC<StyledListItemSubtitleProps>>(RNEListItemSubtitle)`
  color: ${({color}) => color};
`;

export const ListItemSubtitle: React.FC<ListItemSubtitleProps> = (props) => {
  const {text} = useNavigatorThemeColors();
  return <StyledListItemSubtitle {...props} color={text} />;
};
