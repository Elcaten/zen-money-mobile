import * as React from 'react';
import {StyleSheet} from 'react-native';
import {View} from '../../../components';
import {ZenText} from '../../../components/ZenText';

export interface TransactionSectionHeaderProps {
  title: string;
  color: string;
}

export const TransactionSectionHeader: React.FC<TransactionSectionHeaderProps> = ({title, color}) => {
  return (
    <View>
      <ZenText style={[styles.title, {color}]}>{title}</ZenText>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    fontWeight: 'bold',
  },
});
