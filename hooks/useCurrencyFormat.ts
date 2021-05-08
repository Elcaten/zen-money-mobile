import {useCallback} from 'react';
import {AppLocale, useStore} from '../store/use-store';

export const useCurrencyFormat = () => {
  const locale = useStore((x) => x.locale);

  return useCallback(
    (num: number, currencySymbol = '', fractionDigit = 2) => {
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
  return `${currensySymbol ?? ''}${num
    .toFixed(fractionDigits)
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, `$1${digitGroupingSeparator}`)
    .replace('.', decimalSeparator)}`;
}

type x = Parameters<typeof formatCurrency>;
