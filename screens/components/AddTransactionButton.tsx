import * as React from 'react';
import {useMemo} from 'react';
import {PlusIcon, FabButton, MinusIcon, SwapHorizIcon} from '../../components';
import {IActionProps} from '../../lib/react-native-floating-action';
import {useNavigatorThemeColors} from '../../themes';

export enum TransactionType {
  Expense = 'Expense',
  Income = 'Income',
  Transfer = 'Transfer',
}

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

  return (
    <FabButton
      actions={actions}
      onLongPressMain={() => console.log('LONG')}
      onPressItem={(name) => {
        console.log(`selected button: ${name}`);
      }}
    />
  );
};
