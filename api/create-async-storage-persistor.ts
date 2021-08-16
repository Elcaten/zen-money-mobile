import AsyncStorage from '@react-native-async-storage/async-storage';
import {PersistedClient, Persistor} from 'react-query/persistQueryClient-experimental';
import {REACT_QUERY_PERSIST_KEY} from '../utils';

interface CreateLocalStoragePersistorOptions {
  /** The key to use when storing the cache to localstorage */
  localStorageKey?: string;
  /** To avoid localstorage spamming,
   * pass a time in ms to throttle saving the cache to disk */
  throttleTime?: number;
}

export function createAsyncStoragePersistor({
  localStorageKey = REACT_QUERY_PERSIST_KEY,
  throttleTime = 10 * 1000,
}: CreateLocalStoragePersistorOptions = {}): Persistor {
  return {
    persistClient: throttle(async (persistedClient) => {
      await AsyncStorage.setItem(localStorageKey, JSON.stringify(persistedClient, replacer));
    }, throttleTime),
    restoreClient: async () => {
      const cacheString = await AsyncStorage.getItem(localStorageKey);

      if (!cacheString) {
        return;
      }

      return JSON.parse(cacheString, reviver) as PersistedClient;
    },
    removeClient: async () => {
      await AsyncStorage.removeItem(localStorageKey);
    },
  };
}

function throttle<TArgs extends any[]>(func: (...args: TArgs) => any, wait = 100) {
  let timer: number | null = null;

  return function (...args: TArgs) {
    if (timer === null) {
      timer = setTimeout(() => {
        func(...args);
        timer = null;
      }, wait) as any;
    }
  };
}

function replacer(key: string, value: any) {
  if (value instanceof Map) {
    return {
      dataType: 'Map',
      value: [...value], // or with spread: value: [...value]
    };
  } else {
    return value;
  }
}

function reviver(key: string, value: any) {
  if (typeof value === 'object' && value !== null) {
    if (value.dataType === 'Map') {
      return new Map(value.value);
    }
  }
  return value;
}
