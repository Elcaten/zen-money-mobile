export interface Instrument {
  id: number;
  changed: number; // Unix timestamp
  title: string;
  shortTitle: string;
  symbol: string;
  rate: number;
}
