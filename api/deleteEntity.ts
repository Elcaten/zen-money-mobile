import {privateClient} from './client';
import {EntityType} from './entyity-type';

export type DeleteEntityResult =
  | {
      success: true;
    }
  | {
      success: false;
      err: any;
    };

export const deleteEntity = async (
  user: number,
  entityType: EntityType,
  ...ids: string[]
): Promise<DeleteEntityResult> => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res({success: true});
    }, 3000);
  });

  // return privateClient
  //   .post('v8/diff', {
  //     headers: {
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       currentClientTimestamp: new Date().getTime() / 1000,
  //       serverTimestamp: new Date().getTime() / 1000,
  //       deletion: ids.map((id) => ({
  //         id: id,
  //         object: entityType,
  //         user: user,
  //         stamp: new Date().getTime(),
  //       })),
  //     }),
  //   })
  //   .then(() => ({success: true} as const))
  //   .catch((err) => ({success: false, err}));
};
