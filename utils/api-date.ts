import dayjs from 'dayjs';

export const toApiDate = (date: Date) => dayjs(date).format('YYYY-MM-DD');
export const fromApiDate = (date: string) => dayjs(date, 'YYYY-MM-DD').toDate();
