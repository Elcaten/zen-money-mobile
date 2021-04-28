import * as React from 'react';
import {TextProps} from 'react-native-elements';
import styled from 'styled-components/native';
import {useNavigatorThemeColors} from '../themes';
import {Text as RNEText} from 'react-native-elements';

type StyledTextProps = TextProps & {
  color: string;
};

const StyledText = styled<React.FC<StyledTextProps>>(RNEText)`
  color: ${(props) => props.color};
`;

export const Text: React.FC<TextProps> = (props) => {
  const {text} = useNavigatorThemeColors();
  return <StyledText {...props} color={text} />;
};
