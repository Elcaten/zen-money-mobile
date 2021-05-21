import * as React from 'react';
import {useTranslation} from 'react-i18next';
import {Picker, PickerProps} from 'react-native';
import {TransactionType} from '../transaction-type';

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

const useTransactionTypes = () => {
  const {t} = useTranslation();

  return [
    {
      type: TransactionType.Expense,
      label: t('Screen.AddTransaction.Expense'),
    },
    {
      type: TransactionType.Income,
      label: t('Screen.AddTransaction.Income'),
    },
    {
      type: TransactionType.Transfer,
      label: t('Screen.AddTransaction.Transfer'),
    },
  ];
};
