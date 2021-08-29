import {IApiCommand} from './commands/common';
import {ConfirmCommand} from './commands/confirm';
import {LevelUpCommand} from './commands/level-up';
import {OperationsCommand} from './commands/operations';
import {SessionCommand} from './commands/session';
import {SessionStatusCommand} from './commands/session-status';
import {SignUpCommand} from './commands/signup';
import {ApiOperation, ResultCode} from './commands/types';
import {WarmupCacheCommand} from './commands/warmup-cache';
import {RequestError} from './lib/error';
import {RequestOptions} from './lib/request';
import {isOk} from './lib/utils';
import {ApiCommandsManager, IApiCommandsManager} from './modules/commands-manager';

export class TinkoffApi {
  private sender: IApiCommandsManager;

  constructor(commandsManager?: IApiCommandsManager) {
    this.sender = commandsManager || new ApiCommandsManager();
  }

  public async initializeSession(): Promise<SessionCommand.IResponse> {
    const res = await this.sender.send(SessionCommand);
    if (res.resultCode !== ResultCode.OK) {
      throw new RequestError({
        message: `Cannot get sessionid: result code is '${res.resultCode}'`,
        response: res,
      });
    }
    return res;
  }

  public async checkSessionStatus(sessionId: string) {
    const query: SessionStatusCommand.IRequestQuery = {sessionid: sessionId};
    const res = await this.sendCommand(SessionStatusCommand, {searchParams: query});
    if (res.resultCode !== ResultCode.OK) {
      throw new RequestError({
        message: `Cannot check session status: result code is '${res.resultCode}'`,
        response: res,
      });
    }
    return res;
  }

  public async signUp(sessionId: string, auth: SignUpCommand.IAuth) {
    const query: SignUpCommand.IRequestQuery = {sessionid: sessionId};
    // Actually, GET request with auth params in query also works. That's kinda strange
    return await this.sendCommand(SignUpCommand, {form: auth, searchParams: query});
  }

  public async confirm(sessionId: string, operation: string, operationTicket: string, smsId: string | number) {
    const query: ConfirmCommand.IRequestQuery = {sessionid: sessionId};
    const formData: ConfirmCommand.IRequestForm = {
      initialOperation: operation,
      initialOperationTicket: operationTicket,
      confirmationData: JSON.stringify({SMSBYID: smsId}),
    };
    return await this.sendCommand(ConfirmCommand, {form: formData, searchParams: query});
  }

  public confirmSignUp(sessionId: string, operationTicket: string, smsId: string) {
    return this.confirm(sessionId, ApiOperation.SIGN_UP, operationTicket, smsId);
  }

  public levelUp(sessionId: string) {
    const query: LevelUpCommand.IRequestQuery = {sessionid: sessionId};
    return this.sendCommand(LevelUpCommand, {searchParams: query});
  }

  public warmUpCache(sessionId: string, wuid?: string) {
    const query: WarmupCacheCommand.IRequestQuery = {sessionid: sessionId};
    const options: RequestOptions = {searchParams: query};
    if (isOk(wuid)) {
      options.form = {wuid};
    }
    return this.sendCommand(WarmupCacheCommand, options);
  }

  public getOperations(sessionId: string, from = new Date(0), to = new Date()) {
    const query: OperationsCommand.IRequestQuery = {
      sessionid: sessionId,
      start: Number(from),
      end: Number(to),
    };
    return this.sendCommand(OperationsCommand, {searchParams: query});
  }

  private sendCommand<T>(command: IApiCommand<T>, options?: RequestOptions) {
    return this.sender.send(command, options);
  }
}
