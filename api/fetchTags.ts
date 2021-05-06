import {EntityType} from './entyity-type';
import {fetchEntities} from './fetchEntity';
import {Tag} from './models';

export const fetchTags = async () => {
  return fetchEntities<Tag>(EntityType.Tag);
};
