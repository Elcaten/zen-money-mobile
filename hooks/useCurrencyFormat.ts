import {useCallback} from 'react';
import {AppLocale, useStore} from '../store/use-store';

export const useCurrencyFormat = () => {
  const locale = useStore.use.locale();

  return useCallback(
    (num: number, currencySymbol: string, fractionDigit: number) => {
      switch (locale) {
        case AppLocale.Ru:
          return formatCurrency(num, ',', ' ', currencySymbol, fractionDigit);
        default:
          return formatCurrency(num, '.', ',', currencySymbol, fractionDigit);
      }
    },
    [locale],
  );
};

/**
 * @param num positive number
 */
function formatCurrency(
  num: number,
  decimalSeparator: string,
  digitGroupingSeparator: string,
  currensySymbol: string,
  fractionDigits: number,
) {
  currensySymbol = currensySymbol ? ` ${currensySymbol}` : '';
  return `${num
    .toFixed(fractionDigits)
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, `$1${digitGroupingSeparator}`)
    .replace('.', decimalSeparator)}${currensySymbol}`;
}
