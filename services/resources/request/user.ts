import { BaseResponse } from 'services/HttpService/types';
import { httpService } from 'services/HttpService';
import { User } from '../model/user.model';

const getUsers = (searchValue = ''): Promise<BaseResponse<User[]>> =>
  httpService.get<User[]>({
    url: '/users',
    params: searchValue,
  });

export { getUsers };
