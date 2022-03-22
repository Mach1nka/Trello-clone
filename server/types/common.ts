import { Request } from 'express';

import BaseResponse from '../utils/base-response';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Empty {}

export type AnyObject = Record<string, any>;

export type CustomRequest<
  ReqBody = Empty,
  Params = Empty,
  Query = Empty
  // ResBody = Empty,
> = Request<Params, BaseResponse<any>, ReqBody, Query>;

export interface JWTDto {
  userId: string;
  login: string;
}
