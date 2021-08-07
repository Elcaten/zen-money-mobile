export const notNull = <T>(value: T | null | undefined): value is T => {
  return value != null;
};

export function filterMostRecent<T>(arr: T[], newEl: T) {
  const existsInCache = arr.some((x) => x === newEl);
  if (existsInCache) {
    arr = arr.filter((x) => x !== newEl);
  } else if (arr.length === CACHE_SIZE) {
    arr.pop();
  }
  return [newEl, ...arr];
}
const CACHE_SIZE = 3;
