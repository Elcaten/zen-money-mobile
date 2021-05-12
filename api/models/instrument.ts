export interface Instrument {
  id: number;
  /** Unix timestamp */
  changed: number;
  title: string;
  /** 3-letter curency code */
  shortTitle: string;
  symbol: string;
  /**  Currency-to-ruble rate */
  rate: number;
}
