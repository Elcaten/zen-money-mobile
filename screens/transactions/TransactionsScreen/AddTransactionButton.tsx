import {useFocusEffect, useNavigation} from '@react-navigation/native';
import * as React from 'react';
import {useCallback} from 'react';
import {useTranslation} from 'react-i18next';
import {BackHandler} from 'react-native';
import FABGroup from '../../../lib/react-native-paper/FABGroup';
import {fastAddTransactionSelector, useStore} from '../../../store/use-store';
import {useNavigatorThemeColors} from '../../../themes';
import {TransactionsScreenNavigationProp} from '../../../types';
import {TransactionType} from '../transaction-type';

export interface AddTransactionButtonProps {}

export const AddTransactionButton: React.FC<AddTransactionButtonProps> = (props) => {
  const {primary} = useNavigatorThemeColors();
  const {t} = useTranslation();
  const nav = useNavigation<TransactionsScreenNavigationProp>();

  const [open, setOpen] = React.useState(false);

  const fastAddTransaction = useStore(fastAddTransactionSelector);
  const onPress = useCallback(() => {
    if (open) {
      setOpen(false);
    } else {
      if (fastAddTransaction) {
        nav.navigate('EditTransactionScreen', {transactionType: TransactionType.Expense});
      } else {
        setOpen(true);
      }
    }
  }, [open, fastAddTransaction, nav]);
  const onLongPress = useCallback(() => {
    if (fastAddTransaction) {
      setOpen(true);
    }
  }, [fastAddTransaction]);
  const onStateChange = useCallback((state: {open: boolean}) => {
    if (!fastAddTransactionSelector) {
      setOpen(state.open);
    }
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        if (open) {
          setOpen(false);
          return true;
        } else {
          return false;
        }
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [open]),
  );

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
          label: t('TransactionType.Expense'),
          onPress: () => nav.navigate('EditTransactionScreen', {transactionType: TransactionType.Expense}),
          small: false,
        },
        {
          icon: 'plus',
          style: {backgroundColor: primary},
          label: t('TransactionType.Income'),
          onPress: () => nav.navigate('EditTransactionScreen', {transactionType: TransactionType.Income}),
        },
        {
          icon: 'swap-horizontal',
          style: {backgroundColor: primary},
          label: t('TransactionType.Transfer'),
          onPress: () => nav.navigate('EditTransactionScreen', {transactionType: TransactionType.Transfer}),
        },
      ]}
      onStateChange={onStateChange}
      onPress={onPress}
      onLongPress={onLongPress}
    />
  );
};
