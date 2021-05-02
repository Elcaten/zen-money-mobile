import {EntityType, fetchEntities} from './fetchEntity';
import {Tag} from './models';

export const fetchTags = async () => {
  return fetchEntities<Tag>(EntityType.Tag).then((tags) => new Map(tags?.map((t) => [t.id, t])));
};
