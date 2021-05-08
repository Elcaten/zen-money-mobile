import {useNavigation} from '@react-navigation/native';
import * as React from 'react';
import {useMemo} from 'react';
import {FabButton, MinusIcon, PlusIcon, SwapHorizIcon} from '../../components';
import {IActionProps} from '../../lib/react-native-floating-action';
import {useNavigatorThemeColors} from '../../themes';
import {TransactionsScreenNavigationProp} from '../../types';
import {TransactionType} from './transaction-type';

export interface AddTransactionButtonProps {}

export const AddTransactionButton: React.FC<AddTransactionButtonProps> = (props) => {
  const {primary} = useNavigatorThemeColors();

  const actions = useMemo<IActionProps[]>(() => {
    return [
      {
        text: TransactionType.Expense,
        color: primary,
        icon: <MinusIcon color={'white'} size={24} />,
        name: TransactionType.Expense,
        position: 1,
      },
      {
        text: TransactionType.Income,
        color: primary,
        icon: <PlusIcon color={'white'} size={24} />,
        name: TransactionType.Income,
        position: 2,
      },
      {
        text: TransactionType.Transfer,
        color: primary,
        icon: <SwapHorizIcon color={'white'} size={24} />,
        name: TransactionType.Transfer,
        position: 2,
      },
    ];
  }, [primary]);

  const nav = useNavigation<TransactionsScreenNavigationProp>();

  return (
    <FabButton
      actions={actions}
      onLongPressMain={() => nav.navigate('TransactionDetailsScreen', {transactionType: TransactionType.Expense})}
      onPressItem={(name) => nav.navigate('TransactionDetailsScreen', {transactionType: name as TransactionType})}
    />
  );
};
