import { Request, Response } from 'express';

import BaseResponse from '../../utils/base-response';
import getUsersService from '../services/users';
import { PassportUser } from '../../types/types';

const getUsers = async (req: Request, res: Response): Promise<void> => {
  const { _id } = req.user as PassportUser;
  const { searchValue } = req.params;

  const users = await getUsersService(searchValue, _id);

  res.json(new BaseResponse(users));
};

export { getUsers };
