export interface Transaction {
  id: string; // UUID
  changed: number; // Unix timestamp
  created: number; // Unix timestamp
  user: number; // User.id
  deleted: boolean;
  hold: boolean | null;

  incomeInstrument: number; // Instrument.id
  incomeAccount: string; // Account.id
  income: number; // >= 0
  incomeBankID: number | null;
  outcomeInstrument: number; // Instrument.id
  outcomeAccount: string; // Account.id
  outcome: number; //  >= 0
  outcomeBankID: number | null;

  tag: string[] | null; // Tag.id
  merchant: string | null; // Merchant.id
  payee: string | null;
  originalPayee: string | null;
  comment: string | null;

  date: string; // 'yyyy-MM-dd'

  mcc: number | null;

  reminderMarker: string | null;

  opIncome: number | null; //  >= 0
  opIncomeInstrument: number | null; // Instrument.id
  opOutcome: number | null; //  >= 0
  opOutcomeInstrument: number | null; // Instrument.id

  latitude: number | null; //  >= -90  && <= 90
  longitude: number | null; // >= -180 && <= 180
}
