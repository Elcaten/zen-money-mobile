import React from 'react';
import {Modal, ModalBaseProps, StyleSheet} from 'react-native';
import {useNavigatorThemeColors} from '../../themes';
import {View} from '../View';

export type ZenFormSheetProps = {
  visible: boolean;
} & Pick<ModalBaseProps, 'onShow' | 'onRequestClose'>;

export const ZenFormSheet: React.FC<ZenFormSheetProps> = ({visible, onRequestClose, children}) => {
  const {card} = useNavigatorThemeColors();

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="formSheet" onRequestClose={onRequestClose}>
      <View style={[styles.wrapper, {backgroundColor: card}]}>{children}</View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
});
