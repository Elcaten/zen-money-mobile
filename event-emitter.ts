import {EventEmitter} from 'eventemitter3'; //TODO: can we use EventEmitter from ReactNative?

export type ListenerSignature<L> = {
  [E in keyof L]: (...args: any[]) => any;
};

export type DefaultListener = {
  [k: string]: (...args: any[]) => any;
};

export declare interface TypedEmitter<L extends ListenerSignature<L> = DefaultListener> {
  addListener<U extends keyof L>(event: U, listener: L[U]): this;
  removeListener<U extends keyof L>(event: U, listener: L[U]): this;
  removeAllListeners(event?: keyof L): this;
  once<U extends keyof L>(event: U, listener: L[U]): this;
  on<U extends keyof L>(event: U, listener: L[U]): this;
  off<U extends keyof L>(event: U, listener: L[U]): this;
  emit<U extends keyof L>(event: U, ...args: Parameters<L[U]>): boolean;
  eventNames<U extends keyof L>(): U[];
  listenerCount(type: keyof L): number;
  listeners<U extends keyof L>(type: U): L[U][];
}

export interface ZenEvents {
  prompt: (title: string, description: string) => void;
  promptConfirm: (response: string) => void;
  promptCancel: () => void;
}

export const eventEmitter = new EventEmitter() as TypedEmitter<ZenEvents>;
