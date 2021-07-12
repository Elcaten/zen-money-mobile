import * as React from 'react';
import {StyleSheet} from 'react-native';
import {GRAY} from '../../constants/Colors';
import {Text} from '../Text';
import {ListItem, ListItemProps} from './ListItem';

type PickerhListItemProps = ListItemProps & {
  title: string;
  value?: string;
};

export function PickerListItem({title, value, ...rest}: React.PropsWithChildren<PickerhListItemProps>) {
  return (
    <ListItem bottomDivider {...rest} style={[rest.style, rest.disabled ? styles.disabled : {}]}>
      <ListItem.Title>{title}</ListItem.Title>
      <Text numberOfLines={1} style={styles.value}>
        {value}
      </Text>
      <ListItem.Chevron />
    </ListItem>
  );
}

const styles = StyleSheet.create({
  value: {
    color: GRAY,
    flex: 1,
    textAlign: 'right',
  },
  disabled: {
    opacity: 0.65,
  },
});
