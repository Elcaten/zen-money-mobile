import * as React from 'react';
import {RadioboxBlankIcon, RadioboxMarkedIcon} from '../../components';
import {ListItem} from '../../components/ListItem';

export const RadioButton: React.FC<Parameters<typeof ListItem.CheckBox>['0']> = (props) => {
  return <ListItem.CheckBox {...props} checkedIcon={<RadioboxMarkedIcon />} uncheckedIcon={<RadioboxBlankIcon />} />;
};
