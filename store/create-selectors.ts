import {State, UseStore} from 'zustand';

interface Selectors<StoreType> {
  use: {
    [key in keyof StoreType]: () => StoreType[key];
  };
}

export function createSelectorHooks<StoreType extends State>(store: UseStore<StoreType>) {
  (store as any).use = {};

  Object.keys(store.getState()).forEach((key) => {
    const selector = (state: StoreType) => state[key as keyof StoreType];
    (store as any).use[key] = () => store(selector);
  });

  return store as UseStore<StoreType> & Selectors<StoreType>;
}
