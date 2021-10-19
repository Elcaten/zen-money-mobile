import SegmentedControl, {SegmentedControlProps} from '@react-native-segmented-control/segmented-control';
import React, {useCallback} from 'react';
import {StyleSheet} from 'react-native';
import {useNavigatorTheme} from '../../themes';

export type ZenSegmentedControlProps = Omit<SegmentedControlProps, 'appearance' | 'onChange'> & {
  onChange?: (selectedIndex: number) => void;
};
type OnChangeType = NonNullable<SegmentedControlProps['onChange']>;

export const ZenSegmentedControl: React.FC<ZenSegmentedControlProps> = ({onChange: _onChange, style, ...rest}) => {
  const theme = useNavigatorTheme();
  const onChange = useCallback<OnChangeType>((e) => _onChange?.(e.nativeEvent.selectedSegmentIndex), [_onChange]);

  return (
    <SegmentedControl
      onChange={onChange}
      appearance={theme.dark ? 'dark' : 'light'}
      style={[styles.control, style]}
      {...rest}
    />
  );
};

const styles = StyleSheet.create({
  control: {
    flex: 1,
  },
});
