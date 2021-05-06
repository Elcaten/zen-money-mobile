import {privateClient} from './client';
import {EntityType} from './entyity-type';

export const deleteEntity = async (user: number, entityType: EntityType, ...ids: string[]): Promise<any> => {
  const response = await privateClient.post('v8/diff', {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      currentClientTimestamp: new Date().getTime() / 1000,
      serverTimestamp: new Date().getTime() / 1000,
      deletion: ids.map((id) => ({
        id: id,
        object: entityType,
        user: user,
        stamp: new Date().getTime(),
      })),
    }),
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const json = await response.json();
  console.log(`Deleted ${entityType}`);
  return json;
};
