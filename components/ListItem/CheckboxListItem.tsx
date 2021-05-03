import * as React from 'react';
import {ListItem} from './ListItem';

interface CheckboxListItemProps {
  title: string;
  checked: boolean;
  onPress: () => void;
}

export const CheckboxListItem: React.FC<CheckboxListItemProps> = ({title, checked, onPress}) => {
  return (
    <ListItem bottomDivider onPress={onPress}>
      <ListItem.Content>
        <ListItem.Title>{title}</ListItem.Title>
      </ListItem.Content>
      <ListItem.CheckBox
        iconType="material-community"
        checkedIcon="checkbox-marked-outline"
        uncheckedIcon="checkbox-blank-outline"
        checked={checked}
        onPress={onPress}
      />
    </ListItem>
  );
};
