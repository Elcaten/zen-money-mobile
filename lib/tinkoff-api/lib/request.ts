import ky, {Input, Options} from 'ky';
import {RequestError} from './error';
import {ObjectKeysSchema, objectSchema, validateSchema} from './validation';

type RequestTypes = 'get' | 'post' | 'put' | 'delete';

export interface RequestOptions extends Omit<Options, 'searchParams'> {
  searchParams?: any;
  form?: any;
}

type PromiseRequestAPI = Pick<typeof ky, 'get' | 'post' | 'put' | 'delete'>;

export interface IRequestManager {
  send<T>(url: Input, options?: RequestOptions, schema?: ObjectKeysSchema<T>): Promise<T>;
}

export class RequestManager implements IRequestManager {
  private static readonly DEFAULT_METHOD = 'get';

  private request: PromiseRequestAPI;

  constructor(request?: PromiseRequestAPI) {
    this.request = request ?? ky;
  }

  public async send<T>(url: Input, options?: RequestOptions, schema?: ObjectKeysSchema<T>): Promise<T> {
    const res = await this.request[this.getMethod(options)](url, options).json<T>();
    return schema ? this.validateResponse(res, schema, options) : res;
  }

  private getMethod(options?: RequestOptions): RequestTypes {
    return (options?.method?.toLowerCase() as RequestTypes) ?? RequestManager.DEFAULT_METHOD;
  }

  private validateResponse<T>(res: any, schema: ObjectKeysSchema<T>, options?: RequestOptions): T {
    const {obj, valid, error} = validateSchema<T>(res, objectSchema(schema));
    if (!valid) {
      throw new RequestError({
        error,
        request: options,
        response: obj,
        message: 'Response validation error',
      });
    }
    return obj;
  }
}
