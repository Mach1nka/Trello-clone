import { Response } from 'express';

import BaseResponse from '../../utils/base-response';
import { searchUsersService, getUserInfoService } from '../services/users';
import getUserPayload from '../../utils/get-user-payload';
import { User } from '../entities/user';
import { CustomRequest, Empty } from '../../types/common';
import { ParamsForSearching } from '../../types/users/interfaces';

const searchUsers = async (
  req: CustomRequest<Empty, ParamsForSearching>,
  res: Response
): Promise<void> => {
  const { userId } = getUserPayload(req);
  const { searchedValue } = req.params;

  const users = await searchUsersService({ searchedValue, userId });

  res.json(new BaseResponse<User[]>(users));
};

const getUserInfo = async (req: CustomRequest, res: Response): Promise<void> => {
  const { userId } = getUserPayload(req);

  const user = await getUserInfoService({ userId });

  res.json(new BaseResponse<User>(user));
};

export { searchUsers, getUserInfo };
