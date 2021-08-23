import dayjs from 'dayjs';
import {MMM_YYYY, YYYY} from './date-formats';

export type GroupFunc = (x: {date: dayjs.Dayjs}) => string;

export type GroupName = 'ByMonth' | 'ByWeek' | 'ByYear'; /*| 'Custom';*/

export const grouppings: Record<GroupName, GroupFunc> = {
  ByMonth: ({date}) => date.format(MMM_YYYY),
  ByYear: ({date}) => date.format(YYYY),
  ByWeek: ({date}) => `${date.week()} ${date.format(YYYY)}`,
  // Custom: ({date}) => {
  //   throw new Error('NotImplemented');
  // },
};
