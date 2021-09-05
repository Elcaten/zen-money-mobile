import dayjs from 'dayjs';
import i18n from 'i18next';
import {eventEmitter} from '../event-emitter';
import {TinkoffApi} from '../lib/tinkoff-api';
import {ResultCode} from '../lib/tinkoff-api/commands';
import {RequestError} from '../lib/tinkoff-api/lib/error';
import {Operation} from '../screens/sync/SyncScreen/types';
import {showToast} from '../utils';
import {persistSessionId, pullSessionIdFromStorage} from './session-id';

const api = new TinkoffApi();

export const fetchOperations = async (
  username: string,
  password: string,
  start: Date,
  end: Date,
): Promise<Operation[]> => {
  console.log(`Fetching operations ${dayjs(start).format('DD/MM/YYYY')} - ${dayjs(end).format('DD/MM/YYYY')}`);

  const storedSessionId = await pullSessionIdFromStorage();
  let sessionId: string | undefined;

  // Check if we can reuse existing session
  if (storedSessionId) {
    try {
      let status = await api.checkSessionStatus(storedSessionId);
      if (status.payload.millisLeft && status.payload.millisLeft > 30 * 1000) {
        await api.warmUpCache(storedSessionId);
      }
      sessionId = storedSessionId;
    } catch (err) {
      if (err instanceof RequestError && err.props.response.resultCode === ResultCode.SESSION_IS_ABSENT) {
        sessionId = undefined;
      }
    }
  }

  try {
    // Reuse session if possible
    if (sessionId) {
      let status = await api.checkSessionStatus(sessionId);
      if (status.payload.millisLeft && status.payload.millisLeft > 30 * 1000) {
        await api.warmUpCache(sessionId);
      }
      const {payload} = await api.getOperations(sessionId, start, end);
      return payload;
      // Otherwise just create a new one
    } else {
      sessionId = (await signUp(username, password))?.sessionId;
      if (sessionId) {
        const {payload} = await api.getOperations(sessionId, start, end);
        persistSessionId(sessionId);
        return payload;
      } else {
        return [];
      }
    }
  } catch (err) {
    if (err instanceof RequestError) {
      const message = i18n.t(`FetchOperations.${err.props.response.resultCode}`, undefined);
      if (message) {
        showToast(message);
      }
      return [];
    } else {
      throw err;
    }
  }
};

const signUp = async (username: string, password: string): Promise<{sessionId: string} | undefined> => {
  try {
    const initSessionResponse = await api.initializeSession();
    const signUpResponse = await api.signUp(initSessionResponse.payload, {
      username,
      password,
    });
    const operationTicket = signUpResponse.operationTicket;
    const sessionId = initSessionResponse.payload;

    eventEmitter.emit('prompt', 'Sms code', 'Please enter sms code');
    const smsId = await new Promise<string | null>((resolve) => {
      eventEmitter.once('promptConfirm', (response) => resolve(response));
      eventEmitter.once('promptCancel', () => resolve(null));
    });

    if (smsId) {
      await api.confirmSignUp(sessionId, operationTicket, smsId);
      await api.levelUp(sessionId);
      return {sessionId};
    } else {
      return undefined;
    }
  } catch (err) {
    if (err instanceof RequestError) {
      const message = i18n.t(`FetchOperations.${err.props.response.resultCode}`, undefined);
      if (message) {
        showToast(message);
      }
    } else {
      throw err;
    }
  }
};
