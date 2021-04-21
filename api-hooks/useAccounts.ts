import {useQuery} from 'react-query';
import {fetchAccounts} from '../api';
import {ACCOUNTS} from '../auth';

export const useAccounts = () => useQuery(ACCOUNTS, fetchAccounts);
