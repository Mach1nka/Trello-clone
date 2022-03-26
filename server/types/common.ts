import { Request } from 'express';

import BaseResponse from '../utils/base-response';
import { UserRole } from './auth/interfaces';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Empty {}

export type AnyObject = Record<string, any>;

export interface CustomRequest<
  ReqBody = Empty,
  Params = Empty,
  Query = Empty
  // ResBody = Empty,
> extends Request<Params, BaseResponse<any>, ReqBody, Query> {
  userRole?: UserRole;
}

export interface JWTDto {
  userId: string;
  login: string;
}

declare global {
  namespace Express {
    interface User {
      id: string;
      login: string;
    }
  }
}
