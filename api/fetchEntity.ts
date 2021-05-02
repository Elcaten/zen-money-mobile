import {privateClient} from './client';
import testEntities from '../assets/json/test-entities.json';
import {Diff} from './models/diff';

export enum EntityType {
  Account = 'account',
  Instrument = 'instrument',
  Transaction = 'transaction',
  Tag = 'tag',
  User = 'user',
}

export const fetchEntities = async <T>(entityType: EntityType): Promise<T[]> => {
  const response = await privateClient.post('v8/diff', {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      currentClientTimestamp: new Date().getTime() / 1000,
      serverTimestamp: new Date().getTime() / 1000,
      forceFetch: [entityType],
    }),
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const json = await response.json();
  console.log(`Fetched ${entityType}`);
  return json[entityType] as T[];
};
