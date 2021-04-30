import * as React from 'react';
import {StyleSheet} from 'react-native';
import {ListItem} from '../../components/ListItem';
import {GRAY} from '../../constants/Colors';

export interface TransactionSectionHeaderProps {
  title: string;
}

export const TransactionSectionHeader: React.FC<TransactionSectionHeaderProps> = ({title}) => {
  return (
    <ListItem>
      <ListItem.Title style={styles.title}>{title}</ListItem.Title>
    </ListItem>
  );
};

const styles = StyleSheet.create({
  title: {
    color: GRAY,
    fontWeight: 'bold',
  },
});
