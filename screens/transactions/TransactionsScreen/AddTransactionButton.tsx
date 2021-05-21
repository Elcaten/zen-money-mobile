import {useNavigation} from '@react-navigation/native';
import * as React from 'react';
import {useMemo} from 'react';
import {FabButton, MinusIcon, PlusIcon, SwapHorizIcon} from '../../../components';
import {IActionProps} from '../../../lib/react-native-floating-action';
import {useNavigatorThemeColors} from '../../../themes';
import {TransactionsScreenNavigationProp} from '../../../types';
import {TransactionType} from '../transaction-type';
import {useTranslation} from 'react-i18next';

export interface AddTransactionButtonProps {}

export const AddTransactionButton: React.FC<AddTransactionButtonProps> = (props) => {
  const {primary} = useNavigatorThemeColors();
  const {t} = useTranslation();

  const actions = useMemo<IActionProps[]>(() => {
    return [
      {
        text: t('Screen.AddTransaction.Expense'),
        color: primary,
        icon: <MinusIcon color={'white'} size={24} />,
        name: TransactionType.Expense,
        position: 1,
      },
      {
        text: t('Screen.AddTransaction.Income'),
        color: primary,
        icon: <PlusIcon color={'white'} size={24} />,
        name: TransactionType.Income,
        position: 2,
      },
      {
        text: t('Screen.AddTransaction.Transfer'),
        color: primary,
        icon: <SwapHorizIcon color={'white'} size={24} />,
        name: TransactionType.Transfer,
        position: 2,
      },
    ];
  }, [primary, t]);

  const nav = useNavigation<TransactionsScreenNavigationProp>();

  return (
    <FabButton
      actions={actions}
      onLongPressMain={() => nav.navigate('EditTransactionScreen', {transactionType: TransactionType.Expense})}
      onPressItem={(name) => nav.navigate('EditTransactionScreen', {transactionType: name as TransactionType})}
    />
  );
};
