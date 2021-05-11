import {privateClient} from './client';
import {EntityType} from './entyity-type';

export const fetchEntities = async <T>(entityType: EntityType): Promise<T[]> => {
  const response = await privateClient.post('v8/diff', {
    throwHttpErrors: false,
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

  if (response.ok) {
    const json = await response.json();
    console.log(`Fetched ${entityType}`);
    return json[entityType] as T[];
  } else {
    console.log(`Err fetching ${entityType}: ${response.status}`);
    return [];
  }
};
