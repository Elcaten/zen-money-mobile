import {EntityType, fetchEntities} from './fetchEntity';

export const fetchAccounts = async () => {
  return fetchEntities<Account>(EntityType.Account);
};

export interface Account {
  archive: boolean;
  balance: number;
  capitalization: null;
  changed: number;
  company: null;
  creditLimit: number;
  enableCorrection: boolean;
  enableSMS: boolean;
  endDateOffset: null;
  endDateOffsetInterval: null;
  id: string;
  inBalance: boolean;
  instrument: number;
  payoffInterval: null;
  payoffStep: null;
  percent: null;
  private: boolean;
  role: null;
  savings: boolean;
  startBalance: number;
  startDate: null;
  syncID: null;
  title: string;
  type: string;
  user: number;
}
