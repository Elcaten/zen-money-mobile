export {};

type FlatArray<Arr, Depth extends number> = {
  done: Arr;
  recur: Arr extends ReadonlyArray<infer InnerArr>
    ? FlatArray<InnerArr, [-1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20][Depth]>
    : Arr;
}[Depth extends -1 ? 'done' : 'recur'];

declare global {
  interface Array<T> {
    groupBy<TKey extends keyof T>(selector: TKey): Map<T[TKey], T[]>;
    flatten<A, D extends number = 1>(this: A, depth?: D): FlatArray<A, D>[];
  }
}

if (!Array.prototype.groupBy) {
  // eslint-disable-next-line no-extend-native
  Array.prototype.groupBy = function <TData, TKey extends keyof TData>(selector: TKey) {
    return (this as TData[]).reduce((acc, item) => {
      const key = item[selector];
      if (!acc.has(key)) {
        acc.set(key as any, []);
      }
      acc.get(key)!.push(item);
      return acc;
    }, new Map<TData[TKey], TData[]>());
  };
}

if (!Array.prototype.flatten) {
  // eslint-disable-next-line no-extend-native
  Array.prototype.flatten = function <T>() {
    return this.reduce((acc, val) => (Array.isArray(val) ? acc.concat(val.flatten()) : acc.concat(val)), []);
  };
}
