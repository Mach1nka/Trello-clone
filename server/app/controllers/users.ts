import { Request, Response } from 'express';

import BaseResponse from '../../utils/base-response';
import getUsersService from '../services/users';
import getUserPayload from '../../utils/get-user-payload';

const getUsers = async (req: Request, res: Response): Promise<void> => {
  const { userId } = getUserPayload(req);
  const { searchValue } = req.params;

  const users = await getUsersService(searchValue, userId);

  res.json(new BaseResponse(users));
};

export { getUsers };
