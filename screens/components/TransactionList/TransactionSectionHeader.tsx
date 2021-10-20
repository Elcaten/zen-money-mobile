import * as React from 'react';
import {StyleSheet} from 'react-native';
import {ZenText} from '../../../components/ZenText';

export interface TransactionSectionHeaderProps {
  title: string;
  color: string;
}

export const TransactionSectionHeader: React.FC<TransactionSectionHeaderProps> = ({title, color}) => {
  return <ZenText style={[styles.title, {color}]}>{title}</ZenText>;
};

const styles = StyleSheet.create({
  title: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    fontWeight: 'bold',
  },
});
