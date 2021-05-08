import * as React from 'react';
import {Picker, PickerProps} from 'react-native';
import {TransactionType, useTransactionTypes} from './transaction-type';

export type TransactionTypePickerProps = {
  selectedType: TransactionType | null;
  onSelect: (tag: TransactionType) => void;
} & Pick<PickerProps, 'style'>;

export const TransactionTypePicker: React.FC<TransactionTypePickerProps> = ({selectedType, onSelect, style}) => {
  const types = useTransactionTypes();
  return (
    <Picker onValueChange={onSelect} selectedValue={selectedType} style={style}>
      {types.map((t) => (
        <Picker.Item key={t.type} value={t.type} label={t.label} />
      ))}
    </Picker>
  );
};
