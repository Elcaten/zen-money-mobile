import {useCallback} from 'react';
import {useTranslation} from 'react-i18next';
import {useQuery, useQueryClient} from 'react-query';
import {fetchInstruments} from '../api';
import {Instrument} from '../api/models';
import {RUB_SYMBOL} from '../constants/Strings';
import {QueryKeys} from './query-keys';

const EMPTY_MAP = new Map<number, Instrument>();

export const useInstruments = () => {
  const {t} = useTranslation();
  const {data, isLoading} = useQuery(
    QueryKeys.Intruments,
    () => fetchInstruments().then((instruments) => mapToDictionary(instruments, t)),
    {
      staleTime: Infinity,
    },
  );

  const queryClient = useQueryClient();

  const invalidate = useCallback(() => {
    queryClient.invalidateQueries(QueryKeys.Intruments);
  }, [queryClient]);

  return {isLoading, data: data ?? EMPTY_MAP, invalidate};
};

const mapToDictionary = (
  instruments: Instrument[],
  t: ReturnType<typeof useTranslation>['t'],
): Map<number, Instrument> =>
  new Map<number, Instrument>(
    instruments?.map((i) => [i.id, {...i, symbol: fixSymbol(i.symbol), title: t(`Currencies:${i.shortTitle}` as any)}]),
  );

const fixSymbol = (symbol: string) => (symbol === 'руб.' ? RUB_SYMBOL : symbol);
