import {AccountModel} from '../../../api-hooks';

export type EditableAccount = Pick<
  AccountModel,
  | 'id'
  | 'title'
  | 'type'
  | 'instrument'
  | 'balance'
  | 'startBalance'
  | 'inBalance'
  | 'archive'
  | 'savings'
  | 'creditLimit'
>;
