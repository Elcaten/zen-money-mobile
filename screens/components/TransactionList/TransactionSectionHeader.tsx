import * as React from 'react';
import {StyleSheet} from 'react-native';
import {Text, View} from '../../../components';

export interface TransactionSectionHeaderProps {
  title: string;
  color: string;
}

export const TransactionSectionHeader: React.FC<TransactionSectionHeaderProps> = ({title, color}) => {
  return (
    <View>
      <Text style={[styles.title, {color}]}>{title}</Text>
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
