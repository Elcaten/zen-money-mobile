import React, {useCallback, useMemo} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {TrashIcon} from '../../../../components';
import {useNavigatorThemeColors} from '../../../../themes';

export interface RemoveOperaionButtonProps {
  index: number;
  onPress: (index: number) => void;
  width: number;
}

export const RemoveOperaionButton: React.FC<RemoveOperaionButtonProps> = ({index, onPress, width}) => {
  const {error, onError} = useNavigatorThemeColors();

  const iconWrapperStyle = useMemo(
    () =>
      ({
        width: width,
        alignItems: 'center',
      } as const),
    [width],
  );

  const onPressMemo = useCallback(() => onPress(index), [index, onPress]);

  return (
    <TouchableOpacity style={[styles.wrapper, {backgroundColor: error}]} onPress={onPressMemo}>
      <View style={iconWrapperStyle}>
        <TrashIcon size={32} color={onError} />
      </View>
    </TouchableOpacity>
  );
};

export const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
