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
      await AsyncStorage.setItem(localStorageKey, JSON.stringify(persistedClient));
    }, throttleTime),
    restoreClient: async () => {
      const cacheString = await AsyncStorage.getItem(localStorageKey);

      if (!cacheString) {
        return;
      }

      return JSON.parse(cacheString) as PersistedClient;
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
