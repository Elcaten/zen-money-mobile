export interface User {
  id: number;
  /** Unix timestamp */
  changed: number;
  login?: string | null;
  /** Instrument.id */
  currency: number;
  /** User.id */
  parent?: number | null;
}
