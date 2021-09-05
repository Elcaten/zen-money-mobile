import {TinkoffApi} from '../../../lib/tinkoff-api';

type Await<T> = T extends PromiseLike<infer U> ? U : T;

export type Operation = Await<ReturnType<TinkoffApi['getOperations']>>['payload'][0];

export type OperationMapping = {
  operation: Operation;
  tagId: string | undefined;
  accountId: string | undefined;
  accountTitle: string | undefined;
};
