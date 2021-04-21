import {privateClient} from './client';

type ResponseType = {
  account: Account[];
};

export const fetchAccounts = async () => {
  const response = await privateClient.post('v8/diff', {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      currentClientTimestamp: new Date().getTime() / 1000,
      serverTimestamp: new Date().getTime() / 1000,
      forceFetch: ['account'],
    }),
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const json = await response.json();
  return (json as ResponseType).account;
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
