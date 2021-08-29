import * as SecureStore from 'expo-secure-store';
import {SESSION_ID_PERSIST_KEY} from '../utils';

export const persistSessionId = (sessinoId: string) => SecureStore.setItemAsync(SESSION_ID_PERSIST_KEY, sessinoId);
export const pullSessionIdFromStorage = () => SecureStore.getItemAsync(SESSION_ID_PERSIST_KEY);
