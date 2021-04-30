import * as React from 'react';
import {StyleSheet} from 'react-native';
import {ListItem} from '../../components/ListItem';

export interface TransactionSectionHeaderProps {
  title: string;
}

export const TransactionSectionHeader: React.FC<TransactionSectionHeaderProps> = ({title}) => {
  return (
    <ListItem topDivider>
      <ListItem.Title style={styles.title}>{title}</ListItem.Title>
    </ListItem>
  );
};

const styles = StyleSheet.create({
  title: {
    color: '#8a8a8c',
    fontWeight: 'bold',
  },
});
