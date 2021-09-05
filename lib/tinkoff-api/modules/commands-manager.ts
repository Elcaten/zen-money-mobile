import ky, {Input} from 'ky';
import {IApiCommand, isApiErrorResponse} from '../commands/common';
import {RequestError} from '../lib/error';
import {IRequestManager, RequestManager, RequestOptions} from '../lib/request';
import {isOk} from '../lib/utils';
import {isValidationError, ObjectKeysSchema} from '../lib/validation';

export interface IApiCommandsManager {
  send<T>(command: IApiCommand<T>, options?: RequestOptions): Promise<T>;
}

export class ApiCommandsManager implements IApiCommandsManager {
  private static readonly BASE_URL = 'https://api.tinkoff.ru/v1';
  private static readonly ORIGIN = 'web,ib5,platform';
  private static readonly DEFAULT_METHOD = 'GET';

  private request: IRequestManager;

  constructor(requestManager?: IRequestManager) {
    this.request = requestManager ?? new RequestManager(ky.extend({prefixUrl: ApiCommandsManager.BASE_URL}));
  }

  public async send<T>(command: IApiCommand<T>, _options?: RequestOptions) {
    const options: RequestOptions = {
      ..._options,
      method: command.method || ApiCommandsManager.DEFAULT_METHOD,
    };
    if (_options?.form) {
      const formData = new FormData();
      for (const [key, val] of Object.entries<string>(_options.form)) {
        formData.append(key, val);
      }
      options.body = formData;
    }
    if (command.requiredSession) {
      this.throwOnMissingSession(options);
    }
    try {
      return await this.makeRequest(command.url, options, command.schemaIResponse);
    } catch (e) {
      if (e instanceof RequestError) {
        this.throwOnApiError(command.url, e, options);
      }
      throw e;
    }
  }

  private makeRequest<T>(url: Input, options: RequestOptions, schema?: ObjectKeysSchema<T>) {
    return this.request.send(
      url,
      {
        ...options,
        searchParams: {...options.searchParams, origin: ApiCommandsManager.ORIGIN},
      },
      schema,
    );
  }

  private throwOnApiError(url: Input, err: RequestError, options: RequestOptions) {
    if (isValidationError(err.props.error) && isApiErrorResponse(err.props.response)) {
      // bugsnag.notify(
      //   {
      //     name: 'Tinkoff API error',
      //     message: `Got error response from '${url}'`,
      //   },
      //   (event) =>
      //     event.addMetadata('Details', {
      //       request: JSON.stringify(options, null, 2),
      //       response: JSON.stringify(err.props.response, null, 2),
      //     }),
      // );
      throw new RequestError({
        message: `Got error response from '${url}'`,
        request: options,
        response: err.props.response,
      });
    }
  }

  private throwOnMissingSession(options?: RequestOptions) {
    if (!isOk(options) || !isOk(options.searchParams) || !isOk(options.searchParams.sessionid)) {
      throw new RequestError({
        message: 'No session ID was provided',
        request: options,
      });
    }
  }
}
