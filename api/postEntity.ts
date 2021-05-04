import {privateClient} from './client';
import {EntityType} from './entyity-type';

export const postEntity = async <T>(entityType: EntityType, ...entities: T[]): Promise<any> => {
  const response = await privateClient.post('v8/diff', {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      currentClientTimestamp: new Date().getTime() / 1000,
      serverTimestamp: new Date().getTime() / 1000,
      [entityType]: entities,
    }),
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const json = await response.json();
  console.log(`Posted ${entityType}`);
  return json;
};
