import dayjs from 'dayjs';
import {MMM_YYYY, YYYY} from './date-formats';

export type SortFunc = (a: {groupName: string}, b: {groupName: string}) => number;

export type SortName = 'ByMonth' | 'ByWeek' | 'ByYear'; /*| 'Custom';*/

export const sorts: Record<SortName, SortFunc> = {
  ByMonth: ({groupName: d1}, {groupName: d2}) => dayjs(d2, MMM_YYYY).unix() - dayjs(d1, MMM_YYYY).unix(),
  ByYear: ({groupName: d1}, {groupName: d2}) => dayjs(d2, YYYY).unix() - dayjs(d1, YYYY).unix(),
  ByWeek: ({groupName: d1}, {groupName: d2}) => {
    const [d1Week, d1Year] = d1.split(' ');
    const [d2Week, d2Year] = d2.split(' ');
    const d1Date = dayjs(d1Year, YYYY).week(Number.parseInt(d1Week, 10));
    const d2Date = dayjs(d2Year, YYYY).week(Number.parseInt(d2Week, 10));
    return d2Date.unix() - d1Date.unix();
  },
  // Custom: ({groupName: d1}, {groupName: d2}) => {
  //   throw new Error('NotImplemented');
  // },
};
