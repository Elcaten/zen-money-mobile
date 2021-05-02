export interface Company {
  id: number;
  changed: number; // Unix timestamp
  title: string;
  fullTitle: string;
  www: string;
  country: string;
}
