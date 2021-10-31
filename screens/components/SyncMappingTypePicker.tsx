import * as React from 'react';
import {useCallback, useMemo} from 'react';
import {StyleProp, StyleSheet, TouchableOpacity, ViewProps, ViewStyle} from 'react-native';
import {ArrowDownwardIcon, ArrowUpwardIcon, MinusIcon, PlusIcon, QuestionCircleIcon, View} from '../../components';
import {GREEN_500, RED_500} from '../../constants/Colors';
import {useNavigatorThemeColors} from '../../themes';
import {exhaustiveCheck} from '../../utils';
import {OperationMappingType} from '../sync/SyncScreen/types';
import {useActionSheet} from '@expo/react-native-action-sheet';
import {useTranslation} from 'react-i18next';

export interface SyncMappingTypePickerProps {
  value: OperationMappingType;
  onSelect: (value: OperationMappingType) => void;
  containerStyle?: StyleProp<ViewStyle>;
}

export const SyncMappingTypePicker: React.FC<SyncMappingTypePickerProps> = ({value, onSelect, containerStyle}) => {
  const {secondary} = useNavigatorThemeColors();

  const backgroundColor = useMemo<string>(() => {
    switch (value) {
      case 'income':
        return GREEN_500;
      case 'expense':
        return RED_500;
      case 'transferFrom':
      case 'transferTo':
      case undefined:
        return secondary;
      default:
        exhaustiveCheck(value);
    }
  }, [secondary, value]);

  const {t} = useTranslation();
  const {showActionSheetWithOptions} = useActionSheet();
  const operationMappingMetadata: {type: OperationMappingType; title: string}[] = useMemo(() => {
    return [
      {type: 'expense', title: t('SyncMappingTypePicker.Expense')},
      {type: 'income', title: t('SyncMappingTypePicker.Income')},
      {type: 'transferFrom', title: t('SyncMappingTypePicker.TransferFrom')},
      {type: 'transferTo', title: t('SyncMappingTypePicker.TransferTo')},
      {type: undefined, title: t('SyncMappingTypePicker.Cancel')},
    ];
  }, [t]);
  const actionSheetOptions = useMemo(() => {
    return operationMappingMetadata.map((x) => x.title);
  }, [operationMappingMetadata]);
  const cancelButtonIndex = actionSheetOptions.length - 1;

  const onPress = useCallback(() => {
    showActionSheetWithOptions(
      {
        options: actionSheetOptions,
        cancelButtonIndex: cancelButtonIndex,
      },
      (i) => {
        if (i != null && i !== cancelButtonIndex) {
          onSelect(operationMappingMetadata[i].type);
        }
      },
    );
  }, [showActionSheetWithOptions, actionSheetOptions, cancelButtonIndex, onSelect, operationMappingMetadata]);

  return (
    <View style={[styles.wrapper, containerStyle]}>
      <TouchableOpacity style={[styles.button, {backgroundColor}]} onPress={onPress}>
        <TypeIcon value={value} />
      </TouchableOpacity>
    </View>
  );
};

export const TypeIcon: React.FC<{value: OperationMappingType}> = ({value}) => {
  const {onSecondary} = useNavigatorThemeColors();

  switch (value) {
    case 'income':
      return <PlusIcon color={onSecondary} size={24} />;
    case 'expense':
      return <MinusIcon color={onSecondary} size={24} />;
    case 'transferFrom':
      return <ArrowUpwardIcon color={onSecondary} size={24} />;
    case 'transferTo':
      return <ArrowDownwardIcon color={onSecondary} size={24} />;
    case undefined:
      return <QuestionCircleIcon color={onSecondary} size={24} />;
    default:
      exhaustiveCheck(value);
  }
};

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'flex-start',
    opacity: 0.75,
  },
  button: {
    padding: 8,
    borderRadius: 100,
  },
});
