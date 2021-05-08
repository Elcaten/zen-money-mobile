import dayjs from 'dayjs';

export const toApiDate = (date: Date) => dayjs(date).format('YYYY-MM-DD');
