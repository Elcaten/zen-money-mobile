import * as React from 'react';
import {StyleSheet} from 'react-native';
import {Text, View} from '../../../components';
import {GRAY} from '../../../constants/Colors';

export interface TransactionSectionHeaderProps {
  title: string;
}

export const TransactionSectionHeader: React.FC<TransactionSectionHeaderProps> = ({title}) => {
  return (
    <View>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    color: GRAY,
    fontWeight: 'bold',
  },
});
