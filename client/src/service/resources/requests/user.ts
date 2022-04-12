import { BaseResponse } from '../../httpService/types';
import httpService from '../../httpService/index';
import { SearchedUser, UserInfoResponse } from '../models/user';

const getUserInfo = (): Promise<BaseResponse<UserInfoResponse>> =>
  httpService.get<UserInfoResponse>('/user/info');

const searchUsers = (searchValue = ''): Promise<BaseResponse<SearchedUser[]>> =>
  httpService.get<SearchedUser[]>(`/users/${searchValue}`);

export { getUserInfo, searchUsers };
