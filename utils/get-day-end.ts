export function getDayEnd(_date: Date) {
  const date = new Date(_date);
  date.setHours(23, 59, 59, 999);
  return date;
}
