import {EntityType, fetchEntities} from './fetchEntity';

export const fetchInstruments = async () => {
  return fetchEntities<Instrument>(EntityType.Instrument).then(
    (instruments) => new Map(instruments?.map((i) => [i.id, {...i, symbol: fixSymbol(i.symbol)}])),
  );
};

const fixSymbol = (symbol: string) => (symbol === 'руб.' ? '₽' : symbol);

export interface Instrument {
  id: number;
  changed: number; // Unix timestamp
  title: string;
  shortTitle: string;
  symbol: string;
  rate: number;
}
