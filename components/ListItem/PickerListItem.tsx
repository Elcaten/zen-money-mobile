import * as React from 'react';
import {StyleSheet} from 'react-native';
import {useNavigatorThemeColors} from '../../themes';
import {ZenText} from '../ZenText';
import {ListItem, ListItemProps} from './ListItem';

type PickerhListItemProps = ListItemProps & {
  title: string | undefined;
  value?: string;
  leftIcon?: () => React.ReactNode;
};

export function PickerListItem({title, value, leftIcon, ...rest}: React.PropsWithChildren<PickerhListItemProps>) {
  const {secondaryText} = useNavigatorThemeColors();
  return (
    <ListItem {...rest} style={[rest.style, rest.disabled ? styles.disabled : {}]}>
      {leftIcon && leftIcon()}
      <ListItem.Title>{title}</ListItem.Title>
      <ZenText numberOfLines={1} style={[styles.value, {color: secondaryText}]}>
        {value}
      </ZenText>
      <ListItem.Chevron size={20} />
    </ListItem>
  );
}

const styles = StyleSheet.create({
  value: {
    flex: 1,
    textAlign: 'right',
  },
  disabled: {
    opacity: 0.65,
  },
});
