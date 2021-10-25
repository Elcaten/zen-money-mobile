import React, {useCallback, useState} from 'react';
import {Modal, ModalBaseProps, StyleSheet} from 'react-native';
import {ZenFormSheetHeader} from './ZenFormSheetHeader';
import {ZenFormSheetHeaderSpacer} from './ZenFormSheetHeaderSpacer';
import {useNavigatorThemeColors} from '../../themes';
import {View} from '../View';
import {ZenFormSheetCancelButton} from './ZenFormSheetCancelButton';

export type ZenFormSheetProps = {
  visible: boolean;
} & Pick<ModalBaseProps, 'onShow' | 'onRequestClose'>;

const ZenFormSheetComponent: React.FC<ZenFormSheetProps> = ({visible, onRequestClose, children}) => {
  const {card} = useNavigatorThemeColors();

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="formSheet" onRequestClose={onRequestClose}>
      <View style={[styles.wrapper, {backgroundColor: card}]}>{children}</View>
    </Modal>
  );
};

export const ZenFormSheet = Object.assign(ZenFormSheetComponent, {
  Header: ZenFormSheetHeader,
  HeaderSpacer: ZenFormSheetHeaderSpacer,
  CancelButton: ZenFormSheetCancelButton,
});

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
});
