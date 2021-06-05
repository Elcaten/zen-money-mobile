import {Picker} from '@react-native-picker/picker';
import * as React from 'react';
import {useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet} from 'react-native';
import {AccountType} from '../../api/models';
import {View} from '../../components';

export type AccountTypePickerProps = {
  selectedType: AccountType;
  onSelect: (type: AccountType) => void;
};

export const AccountTypePicker: React.FC<AccountTypePickerProps> = ({selectedType, onSelect}) => {
  const {t} = useTranslation();
  const options = useMemo(() => {
    return [
      {id: AccountType.Cash, title: t('Components.AccountTypePicker.Cash')},
      {id: AccountType.Card, title: t('Components.AccountTypePicker.Card')},
      {id: AccountType.Checking, title: t('Components.AccountTypePicker.Checking')},
      {id: AccountType.Deposit, title: t('Components.AccountTypePicker.Deposit')},
      {id: AccountType.Loan, title: t('Components.AccountTypePicker.Loan')},
    ];
  }, [t]);

  return (
    <View style={styles.container}>
      <Picker onValueChange={onSelect} selectedValue={selectedType} style={styles.picker}>
        {options.map(({id, title}) => (
          <Picker.Item key={title} value={id} label={title} />
        ))}
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  picker: {
    flex: 1,
    color: '#000000',
  },
});
