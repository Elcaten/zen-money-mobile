import {EntityType, fetchEntities} from './fetchEntity';
import {Instrument} from './models';

export const fetchInstruments = async () => {
  return fetchEntities<Instrument>(EntityType.Instrument).then(
    (instruments) => new Map(instruments?.map((i) => [i.id, {...i, symbol: fixSymbol(i.symbol)}])),
  );
};

const fixSymbol = (symbol: string) => (symbol === 'руб.' ? '₽' : symbol);
