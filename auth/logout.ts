import {persistToken} from './persist-token';

export const logout = () => persistToken(null);
