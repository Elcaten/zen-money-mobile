import {useNavigation} from '@react-navigation/native';
import * as React from 'react';
import {useTranslation} from 'react-i18next';
import FABGroup from '../../../lib/react-native-paper/FABGroup';
import {useNavigatorThemeColors} from '../../../themes';
import {TransactionsScreenNavigationProp} from '../../../types';
import {TransactionType} from '../transaction-type';

export interface AddTransactionButtonProps {}

export const AddTransactionButton: React.FC<AddTransactionButtonProps> = (props) => {
  const {primary} = useNavigatorThemeColors();
  const {t} = useTranslation();
  const nav = useNavigation<TransactionsScreenNavigationProp>();
  const [open, setOpen] = React.useState(false);

  return (
    <FABGroup
      visible
      open={open}
      icon={open ? 'close' : 'plus'}
      fabStyle={{backgroundColor: primary}}
      actions={[
        {
          icon: 'minus',
          style: {backgroundColor: primary},
          label: t('Screen.AddTransaction.Expense'),
          onPress: () => nav.navigate('EditTransactionScreen', {transactionType: TransactionType.Expense}),
          small: false,
        },
        {
          icon: 'plus',
          style: {backgroundColor: primary},
          label: t('Screen.AddTransaction.Income'),
          onPress: () => nav.navigate('EditTransactionScreen', {transactionType: TransactionType.Income}),
        },
        {
          icon: 'swap-horizontal',
          style: {backgroundColor: primary},
          label: t('Screen.AddTransaction.Transfer'),
          onPress: () => nav.navigate('EditTransactionScreen', {transactionType: TransactionType.Transfer}),
        },
      ]}
      onStateChange={({open: value}) => setOpen(value)}
      onLongPress={() => nav.navigate('EditTransactionScreen', {transactionType: TransactionType.Expense})}
    />
  );
};
