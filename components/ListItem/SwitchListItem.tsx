import * as React from 'react';
import {Switch} from '../Switch';
import {ListItem} from './ListItem';

interface SwitchListItemProps {
  title: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
}

export const SwitchListItem: React.FC<SwitchListItemProps> = ({title, value, onValueChange}) => {
  return (
    <ListItem bottomDivider onPress={() => onValueChange(!value)}>
      <ListItem.Content>
        <ListItem.Title>{title}</ListItem.Title>
      </ListItem.Content>
      <Switch value={value} onValueChange={onValueChange} />
    </ListItem>
  );
};
