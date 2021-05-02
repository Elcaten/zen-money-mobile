import {useCallback, useMemo} from 'react';
import {useQuery, useQueryClient} from 'react-query';
import {fetchInstruments} from '../api';
import {INSTRUMENTS} from '../auth';

export const useInstruments = () => {
  const {data, isLoading} = useQuery(INSTRUMENTS, fetchInstruments, {staleTime: Infinity});

  const instruments = useMemo(() => {
    return new Map(data?.map((i) => [i.id, {...i, symbol: fixSymbol(i.symbol)}]));
  }, [data]);

  const queryClient = useQueryClient();

  const invalidate = useCallback(() => {
    queryClient.invalidateQueries(INSTRUMENTS);
  }, [queryClient]);

  return {isLoading, data: instruments, invalidate};
};

const fixSymbol = (symbol: string) => (symbol === 'руб.' ? '₽' : symbol);
