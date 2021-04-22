import {useQuery} from 'react-query';
import {fetchTags} from '../api/fetchTags';
import {TAGS} from '../auth';

export const useTags = () => useQuery(TAGS, fetchTags);
