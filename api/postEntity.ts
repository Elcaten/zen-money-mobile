import {privateClient} from './client';
import {EntityType} from './entyity-type';

export type PostEntityResult =
  | {
      success: true;
    }
  | {
      success: false;
      err: any;
    };

export const postEntity = async <T>(entityType: EntityType, ...entities: T[]): Promise<PostEntityResult> => {
  if (entities.length === 0) {
    return {success: true};
  }

  return privateClient
    .post('v8/diff', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        currentClientTimestamp: new Date().getTime() / 1000,
        serverTimestamp: new Date().getTime() / 1000,
        [entityType]: entities,
      }),
    })
    .then(() => ({success: true} as const))
    .catch((err) => ({success: false, err}));
};
