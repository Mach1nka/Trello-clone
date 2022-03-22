import { Response } from 'express';
import { validationResult } from 'express-validator';

import jwtCreator from '../../utils/jwt-creator';
import BadRequest from '../../utils/errors/bad-request';
import BaseResponse from '../../utils/base-response';
import { loginService, registerService } from '../services/auth';
import { CustomRequest } from '../../types/common';
import { AuthBody, AuthResponse } from '../../types/auth/interfaces';

const logIn = async (req: CustomRequest<AuthBody>, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new BadRequest(errors.array());
  }

  const { id, login } = await loginService(req.body);
  const token = jwtCreator(login, id);

  res.json(new BaseResponse<AuthResponse>({ login, token }));
};

const register = async (req: CustomRequest<AuthBody>, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new BadRequest(errors.array());
  }

  const { id, login } = await registerService(req.body);
  const token = jwtCreator(login, id);

  res.status(201).json(new BaseResponse<AuthResponse>({ login, token }, 201));
};

export { logIn, register };
