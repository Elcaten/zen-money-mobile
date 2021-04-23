export function groupBy<TData, TKey extends keyof TData>(array: TData[], selector: TKey) {
  return array.reduce((acc, item) => {
    const key = item[selector];
    if (!acc.has(key)) {
      acc.set(key as any, []);
    }
    acc.get(key)!.push(item);
    return acc;
  }, new Map<TData[TKey], TData[]>());
}
