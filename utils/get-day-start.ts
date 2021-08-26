export function getDayStart(_date: Date) {
  const date = new Date(_date);
  date.setHours(0, 0, 0, 0);
  return date;
}
