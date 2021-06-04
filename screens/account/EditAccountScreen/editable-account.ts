import {UserAccount} from '../../../api/models';

export type EditableAccount = Pick<UserAccount, 'id' | 'title' | 'type' | 'instrument' | 'balance' | 'archive'>;
