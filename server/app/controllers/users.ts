import { Response } from 'express';

import BaseResponse from '../../utils/base-response';
import getUsersService from '../services/users';
import getUserPayload from '../../utils/get-user-payload';
import { User } from '../entities/user';
import { CustomRequest, Empty } from '../../types/common';
import { ParamsForSearching } from '../../types/users/interfaces';

const getUsers = async (
  req: CustomRequest<Empty, ParamsForSearching>,
  res: Response
): Promise<void> => {
  const { userId } = getUserPayload(req);
  const { searchedValue } = req.params;

  const users = await getUsersService({ searchedValue, userId });

  res.json(new BaseResponse<User[]>(users));
};

export { getUsers };
