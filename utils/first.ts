export function first<T>(arr: T[] | null | undefined): T | undefined {
  return arr != null && arr.length > 0 ? arr[0] : undefined;
}
