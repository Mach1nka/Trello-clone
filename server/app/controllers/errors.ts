import { Request, Response } from 'express';
import fs from 'fs';
import { validationResult } from 'express-validator';

import ClientError, { ClientErrorInDB } from '../models/client-error';
import BaseResponse from '../../utils/base-response';
import BadRequest from '../../utils/errors/bad-request';

interface BufferErrors {
  error: Buffer;
  errorInfo: Buffer;
}

const getClientErrors = async (_req: Request, res: Response): Promise<void> => {
  const allErrors: ClientErrorInDB[] = await ClientError.find({});
  const isDirExists = fs.existsSync('./server/errors');

  const bufferArr: BufferErrors[] = allErrors.map((el) => ({
    error: Buffer.from(JSON.parse(el.error).data),
    errorInfo: Buffer.from(JSON.parse(el.errorInfo).data)
  }));

  if (!allErrors.length) {
    res.json(new BaseResponse({}));
  }

  if (!isDirExists) {
    fs.mkdirSync('./server/errors');
  }

  bufferArr.forEach((el) => {
    fs.appendFileSync('./server/errors/logs.txt', `\n${el.error} \t${el.errorInfo}\n`);
  });

  res.json(new BaseResponse({}));
};

const saveClientError = async (req: Request, res: Response): Promise<void> => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new BadRequest(errors.array());
  }
  const { error, errorInfo } = req.body;

  const bufError = Buffer.from(error);
  const bufErrorInfo = Buffer.from(errorInfo);

  const newError = ClientError.build({
    error: JSON.stringify(bufError),
    errorInfo: JSON.stringify(bufErrorInfo)
  });

  await newError.save();

  res.json(new BaseResponse({}));
};

export { getClientErrors, saveClientError };
