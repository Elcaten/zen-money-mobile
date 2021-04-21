import {useQuery} from 'react-query';
import {fetchInstruments} from '../api';
import {INSTRUMENTS} from '../auth';

export const useInstruments = () =>
  useQuery(INSTRUMENTS, () => fetchInstruments().then((instruments) => new Map(instruments?.map((i) => [i.id, i]))));
