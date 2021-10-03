import * as React from 'react';
import {Platform, StyleProp, ViewStyle} from 'react-native';
import {CheckboxBlankOutlineIcon, CheckboxMarkedOutlineIcon, CheckIcon} from '..';
import {useNavigatorThemeColors} from '../../themes';
import {RadioboxBlankIcon, RadioboxMarkedIcon} from '../Icons';
import {ListItem} from './ListItem';

const ios = Platform.OS === 'ios';
const android = Platform.OS === 'android';
const SIZE = 20;

interface CheckboxListItemProps {
  title: string;
  checked: boolean;
  onPress: () => void;
  multiple?: boolean;
  bottomDivider?: boolean;
  style?: StyleProp<ViewStyle>;
}

export const OptionListItem: React.FC<CheckboxListItemProps> = ({
  title,
  checked,
  multiple,
  onPress,
  bottomDivider,
  style,
}) => {
  const {primary} = useNavigatorThemeColors();

  return (
    <ListItem bottomDivider={bottomDivider} onPress={onPress} style={style}>
      {android && multiple && (
        <ListItem.CheckBox
          checkedIcon={<CheckboxMarkedOutlineIcon size={SIZE} color={primary} />}
          uncheckedIcon={<CheckboxBlankOutlineIcon size={SIZE} />}
          checked={checked}
          onPress={onPress}
        />
      )}
      {android && !multiple && (
        <ListItem.CheckBox
          checkedIcon={<RadioboxMarkedIcon size={SIZE} color={primary} />}
          uncheckedIcon={<RadioboxBlankIcon size={SIZE} />}
          checked={checked}
          onPress={onPress}
        />
      )}
      <ListItem.Content>
        <ListItem.Title>{title}</ListItem.Title>
      </ListItem.Content>
      {ios && (
        <ListItem.CheckBox
          checkedIcon={<CheckIcon size={SIZE} color={primary} />}
          uncheckedIcon={<CheckIcon color={primary} size={SIZE} style={{opacity: 0}} />}
          checked={checked}
          onPress={onPress}
        />
      )}
    </ListItem>
  );
};

OptionListItem.defaultProps = {
  multiple: false,
};
