import * as React from 'react';
import {StyleSheet} from 'react-native';
import {GRAY} from '../../constants/Colors';
import {Text} from '../Text';
import {ListItem} from './ListItem';

interface PickerhListItemProps {
  title: string;
  onPress: () => void;
  value: string;
}

export function PickerListItem({title, value, onPress}: React.PropsWithChildren<PickerhListItemProps>) {
  return (
    <ListItem bottomDivider onPress={onPress}>
      <ListItem.Content>
        <ListItem.Title>{title}</ListItem.Title>
      </ListItem.Content>
      <Text style={styles.value}>{value}</Text>
      <ListItem.Chevron />
    </ListItem>
  );
}

const styles = StyleSheet.create({
  value: {
    color: GRAY,
  },
});
