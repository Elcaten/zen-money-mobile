import {AccountType} from './account-type';

/** User account */
export interface UserAccount {
  /** UUID */
  id: string;
  /** Unix timestamp */
  changed: number;
  /** User.id */
  user: number;
  /** User.id */
  role: number | null;
  /** Instrument.id */
  instrument: number | null;
  /** Company.id */
  company: number | null;
  /** Account type */
  type: AccountType;
  /** Title */
  title: string;
  /** Массив банковских номеров счета.
   * Обычно берутся последние 4 цифры номера счета и последние 4 цифры номеров банковских карт, привязанных к счету.
   **/
  syncID: string[] | null;

  balance: number;
  startBalance: number;
  creditLimit: number | null;

  inBalance: boolean;
  savings: boolean | null;
  enableCorrection: boolean;
  enableSMS: boolean;
  archive: boolean;

  capitalization: null;
  percent: null;
  startDate: null;
  endDateOffset: null;
  endDateOffsetInterval: null;
  payoffStep: null;
  payoffInterval: null;

  private: boolean;
}
