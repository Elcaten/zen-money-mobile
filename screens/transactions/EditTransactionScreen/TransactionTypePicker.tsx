import * as React from 'react';
import {useCallback, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {ButtonGroup, ButtonGroupProps} from 'react-native-elements';
import {ListItem} from '../../../components/ListItem';
import {TransactionType} from '../transaction-type';

export type TransactionTypePickerProps = {
  selectedType: TransactionType | null;
  onSelect: (type: TransactionType) => void;
} & ButtonGroupProps;

export const TransactionTypePicker: React.FC<TransactionTypePickerProps> = ({selectedType, onSelect, ...rest}) => {
  const types = useTransactionTypes();

  const buttons = types.map((t) => t.label);
  const [selectedIndex, setSelectedIndex] = useState(types.findIndex((x) => x.type === selectedType));
  const onPress = useCallback(
    (index: number) => {
      setSelectedIndex(index);
      onSelect(types[index].type);
    },
    [onSelect, types],
  );

  return (
    <ListItem bottomDivider>
      <ButtonGroup
        {...rest}
        onPress={onPress}
        selectedIndex={selectedIndex}
        buttons={buttons}
        containerStyle={styles.buttons}
      />
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

import {StyleSheet} from 'react-native';
import {useElementsTheme} from '../../../themes';

const styles = StyleSheet.create({
  buttons: {
    marginHorizontal: 0,
    marginVertical: 0,
    flex: 1,
  },
});
