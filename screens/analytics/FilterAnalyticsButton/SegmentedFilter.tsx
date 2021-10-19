import * as React from 'react';
import {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {ListItem} from '../../../components/ListItem';
import {ZenSegmentedControl} from '../../../components/ZenSegmentedControl';
import {useNavigatorThemeColors} from '../../../themes';

export function SegmentedFilter({
  buttons: values,
  selectedIndex: _selectedIndex,
  onSelect,
  description,
  renderFooter,
}: React.PropsWithChildren<{
  buttons: string[];
  selectedIndex: number;
  onSelect: (value: number) => void;
  description: string;
  renderFooter?: () => React.ReactElement | null;
}>) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  useEffect(() => {
    setSelectedIndex(_selectedIndex);
  }, [_selectedIndex]);

  const onChange = (index: number) => {
    setSelectedIndex(index);
    onSelect(index);
  };

  return (
    <React.Fragment>
      <ListItem>
        <ListItem.Title>{description}</ListItem.Title>
      </ListItem>
      <ListItem>
        <ZenSegmentedControl
          onChange={onChange}
          selectedIndex={selectedIndex}
          values={values}
          style={styles.segmentedControl}
        />
        {/* <ListItem.Content>

          {renderFooter?.()}
        </ListItem.Content> */}
      </ListItem>
    </React.Fragment>
  );
}

export const styles = StyleSheet.create({
  segmentedControl: {
    marginHorizontal: 0,
    marginVertical: 0,
  },
});
