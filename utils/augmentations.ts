/* eslint-disable no-extend-native */
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
    groupBy<TKey>(selector: (v: T) => TKey): Map<TKey, T[]>;
    flatten<A, D extends number = 1>(this: A, depth?: D): FlatArray<A, D>[];
  }

  interface Map<K, V> {
    mapEntries<TKey, TVal>(iteratee: (e: [K, V]) => [TKey, TVal]): Map<TKey, TVal>;
    mapKeys<TKey>(iteratee: (k: K, v: V) => TKey): Map<TKey, V>;
    mapValues<TVal>(iteratee: (o: V, k: K) => TVal): Map<K, TVal>;
    entriesArray(): [K, V][];
    valuesArray(): V[];
    tryGet<TDefaultValue>(key: K | null | undefined, defaultValue: TDefaultValue): V | TDefaultValue;
  }
}

if (!Array.prototype.groupBy) {
  Array.prototype.groupBy = function <TData, TKey extends keyof TData, TUserKey>(
    this: TData[],
    dataKey: TKey | ((v: TData) => TUserKey),
  ) {
    const getKey = typeof dataKey === 'function' ? dataKey : (x: TData) => x[dataKey];
    return this.reduce((acc, item) => {
      const key = getKey(item);
      if (!acc.has(key)) {
        acc.set(key as any, []);
      }
      acc.get(key)!.push(item);
      return acc;
    }, new Map<TData[TKey] | TUserKey, TData[]>());
  };
}

if (!Array.prototype.flatten) {
  Array.prototype.flatten = function <T>() {
    return this.reduce((acc, val) => (Array.isArray(val) ? acc.concat(val.flatten()) : acc.concat(val)), []);
  };
}

if (!Map.prototype.mapKeys) {
  Map.prototype.mapKeys = function <K, TKey, V>(iteratee: (k: K, v: V) => TKey) {
    return new Map(Array.from(this.entries()).map(([k, v]) => [iteratee(k, v), v]));
  };
}

if (!Map.prototype.mapValues) {
  Map.prototype.mapValues = function <V, TVal, K>(iteratee: (v: V, k: K) => TVal) {
    return new Map(Array.from(this.entries()).map(([k, v]) => [k, iteratee(v, k)]));
  };
}

if (!Map.prototype.mapEntries) {
  Map.prototype.mapEntries = function <K, V, TKey, TVal>(iteratee: (e: [K, V]) => [TKey, TVal]) {
    return new Map(Array.from(this.entries()).map((e) => iteratee(e)));
  };
}

if (!Map.prototype.valuesArray) {
  Map.prototype.valuesArray = function () {
    return Array.from(this.values());
  };
}

if (!Map.prototype.entriesArray) {
  Map.prototype.entriesArray = function () {
    return Array.from(this.entries());
  };
}

if (!Map.prototype.tryGet) {
  Map.prototype.tryGet = function <K, V>(key: K, defaultValue: V) {
    return key ? this.get(key) ?? defaultValue : defaultValue;
  };
}
