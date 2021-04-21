import {EntityType, fetchEntities} from './fetchEntity';

export const fetchInstruments = async () => {
  return fetchEntities<Instrument>(EntityType.Instrument);
};

export interface Instrument {
  id: number;
  changed: number; // Unix timestamp
  title: string;
  shortTitle: string;
  symbol: string;
  rate: number;
}
