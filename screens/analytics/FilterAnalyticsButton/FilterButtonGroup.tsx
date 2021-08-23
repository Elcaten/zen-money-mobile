import * as React from 'react';
import {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {ButtonGroup} from 'react-native-elements';
import {ListItem} from '../../../components/ListItem';

export function FilterButtonGroup({
  buttons,
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

  const onPress = (index: number) => {
    setSelectedIndex(index);
    onSelect(index);
  };

  return (
    <React.Fragment>
      <ListItem topDivider>
        <ListItem.Title>{description}</ListItem.Title>
      </ListItem>
      <ListItem bottomDivider>
        <ListItem.Content>
          <ButtonGroup
            onPress={onPress}
            selectedIndex={selectedIndex}
            buttons={buttons}
            containerStyle={styles.buttons}
          />
          {renderFooter?.()}
        </ListItem.Content>
      </ListItem>
    </React.Fragment>
  );
}

export const styles = StyleSheet.create({
  buttons: {
    marginHorizontal: 0,
    marginVertical: 0,
  },
});
