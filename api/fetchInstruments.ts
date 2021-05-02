import {EntityType, fetchEntities} from './fetchEntity';
import {Instrument} from './models';

export const fetchInstruments = async () => {
  return fetchEntities<Instrument>(EntityType.Instrument);
};
