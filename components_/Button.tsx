import React from 'react';
import {Text, TextProps, TouchableOpacity, TouchableOpacityProps} from 'react-native';
import styled from 'styled-components/native';
import {useThemeColors} from '../themes/app-theme-context';

export const Button: React.FC<{title: string; onPress: () => void}> = (props) => {
  const colors = useThemeColors();
  return (
    <ButtonContainer backgroundColor={colors.buttonColor} onPress={props.onPress}>
      <ButtonText color={colors.buttonTextColor}>{props.title}</ButtonText>
    </ButtonContainer>
  );
};
2;

const StylableTouchableOpacity: React.FC<TouchableOpacityProps & {backgroundColor: string}> = (props) => (
  <TouchableOpacity {...props} />
);

const ButtonContainer = styled(StylableTouchableOpacity)`
  background-color: ${(props) => props.backgroundColor};
  border-radius: 2px;
  elevation: 5;
  padding: 8px;
`;

const StylableText: React.FC<TextProps & {color: string}> = (props) => <Text {...props} />;

const ButtonText = styled(StylableText)`
  color: ${(props) => props.color};
  text-align: center;
  text-transform: uppercase;
`;
