export interface User {
  id: number;
  changed: number; // Unix timestamp
  login?: string;
  currency: number; // Instrument id
  parent?: number; // User id
}
