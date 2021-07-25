import {useMemo} from 'react';
import {useAccountModels, useInstruments, useMe} from '../api-hooks';
import {useCurrencyFormat} from './useCurrencyFormat';

export const useGrandTotal = () => {
  const {data} = useAccountModels();
  const accounts = useMemo(() => data, [data]);
  const {data: instruments} = useInstruments();
  const {data: user} = useMe();
  const formatCurrency = useCurrencyFormat();

  const grandTotal = useMemo(() => {
    const userCurrency = instruments.get(user?.currency!);
    if (!userCurrency) {
      return 0;
    }
    const totalAmount = accounts
      .filter((a) => a.inBalance)
      .reduce((prev, curr) => {
        return prev + (curr.balance * instruments.get(curr.instrument!)?.rate!) / userCurrency.rate!;
      }, 0);
    return formatCurrency(totalAmount, userCurrency.symbol, 0);
  }, [accounts, formatCurrency, instruments, user?.currency]);

  return grandTotal;
};
