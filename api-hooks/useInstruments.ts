import {useCallback, useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import {useQuery, useQueryClient} from 'react-query';
import {fetchInstruments} from '../api';
import {Instrument} from '../api/models';
import {RUB_SYMBOL} from '../constants/Strings';
import {QueryKeys} from './query-keys';

export const useInstruments = () => {
  const {data, isLoading} = useQuery(QueryKeys.Intruments, fetchInstruments, {staleTime: Infinity});
  const {t} = useTranslation();

  const instruments = useMemo(() => {
    return new Map<number, Instrument>(
      data?.map((i) => [i.id, {...i, symbol: fixSymbol(i.symbol), title: t(`Currencies:${i.shortTitle}` as any)}]),
    );
  }, [data, t]);

  const queryClient = useQueryClient();

  const invalidate = useCallback(() => {
    queryClient.invalidateQueries(QueryKeys.Intruments);
  }, [queryClient]);

  return {isLoading, data: instruments, invalidate};
};

const fixSymbol = (symbol: string) => (symbol === 'руб.' ? RUB_SYMBOL : symbol);
