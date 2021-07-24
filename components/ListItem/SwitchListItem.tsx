import * as React from 'react';
import {StyleProp, ViewStyle} from 'react-native';
import {Switch} from '../Switch';
import {ListItem} from './ListItem';

interface SwitchListItemProps {
  title: string;
  value: boolean;
  leftIcon?: () => JSX.Element;
  onValueChange: (value: boolean) => void;
  style?: StyleProp<ViewStyle>;
}

export const SwitchListItem: React.FC<SwitchListItemProps> = ({title, value, leftIcon, onValueChange, style}) => {
  return (
    <ListItem bottomDivider onPress={() => onValueChange(!value)} style={style}>
      {leftIcon && leftIcon()}
      <ListItem.Content>
        <ListItem.Title>{title}</ListItem.Title>
      </ListItem.Content>
      <Switch value={value} onValueChange={onValueChange} />
    </ListItem>
  );
};
