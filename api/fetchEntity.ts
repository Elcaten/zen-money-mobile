import {privateClient} from './client';

export enum EntityType {
  Account = 'account',
  User = 'user',
}

export const fetchEntities = async <T>(entityType: EntityType) => {
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
  return json[entityType] as T[];
};
