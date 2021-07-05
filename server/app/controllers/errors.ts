import { Request, Response } from 'express';
import fs from 'fs';
import { validationResult } from 'express-validator';

import BaseResponse from '../../utils/base-response';
import BadRequest from '../../utils/errors/bad-request';

// const getClientErrors = async (_req: Request, res: Response): Promise<void> => {};

const saveClientError = async (req: Request, res: Response): Promise<void> => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new BadRequest(errors.array());
  }
  const { error, errorInfo } = req.body;

  const isDirExists = fs.existsSync('./server/errors');

  if (!isDirExists) {
    fs.mkdirSync('./server/errors');
  }

  fs.appendFileSync('./server/errors/logs.txt', `\n${error} \t${errorInfo}\n`);

  res.json(new BaseResponse({}));
};

export { saveClientError };
