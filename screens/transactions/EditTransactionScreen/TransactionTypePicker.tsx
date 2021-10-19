import * as React from 'react';
import {useCallback, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet} from 'react-native';
import {ListItem} from '../../../components/ListItem';
import {ZenSegmentedControl} from '../../../components/ZenSegmentedControl';
import {TransactionType} from '../transaction-type';

export type TransactionTypePickerProps = {
  selectedType: TransactionType | null;
  onSelect: (type: TransactionType) => void;
};

export const TransactionTypePicker: React.FC<TransactionTypePickerProps> = ({selectedType, onSelect}) => {
  const types = useTransactionTypes();

  const values = types.map((t) => t.label);
  const [selectedIndex, setSelectedIndex] = useState(types.findIndex((x) => x.type === selectedType));
  const onChange = useCallback(
    (index: number) => {
      setSelectedIndex(index);
      onSelect(types[index].type);
    },
    [onSelect, types],
  );

  return (
    <ListItem>
      <ZenSegmentedControl values={values} selectedIndex={selectedIndex} onChange={onChange} style={styles.control} />
    </ListItem>
  );
};

const useTransactionTypes = () => {
  const {t} = useTranslation();

  return [
    {
      type: TransactionType.Expense,
      label: t('TransactionType.Expense'),
    },
    {
      type: TransactionType.Income,
      label: t('TransactionType.Income'),
    },
    {
      type: TransactionType.Transfer,
      label: t('TransactionType.Transfer'),
    },
  ];
};

const styles = StyleSheet.create({
  control: {
    marginVertical: 8,
  },
});
