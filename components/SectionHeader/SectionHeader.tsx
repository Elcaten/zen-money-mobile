import React from 'react';
import {StyleSheet} from 'react-native';
import {useNavigatorThemeColors} from '../../themes';
import {ZenText} from '../ZenText';

export interface SectionHeaderProps {
  text: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({text}) => {
  const {background, secondaryText} = useNavigatorThemeColors();
  const themeStyles = {backgroundColor: background, color: secondaryText};

  return <ZenText style={[styles.sectionHeader, themeStyles]}>{text}</ZenText>;
};

const styles = StyleSheet.create({
  sectionHeader: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    fontWeight: 'bold',
  },
});
