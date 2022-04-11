import { userRepository } from '../database/repositories';
import { User } from '../entities/user';
import { ParamsForSearching } from '../../types/users/interfaces';
import { UserId } from '../../types/auth/interfaces';
import NotFound from '../../utils/errors/not-found';

const searchUsersService = async (data: ParamsForSearching & UserId): Promise<User[]> => {
  const { searchedValue, userId } = data;

  const users: User[] = await userRepository()
    .createQueryBuilder('users')
    .where('users.login ILIKE :searchValue', { searchValue: `%${searchedValue}%` })
    .andWhere('users.id != :userId', { userId })
    .select(['users.login', 'users.id'])
    .getMany();

  return users;
};

const getUserInfoService = async (data: UserId): Promise<User> => {
  const { userId } = data;

  const userInfo: User | undefined = await userRepository().findOne(userId, { select: ['login'] });

  if (!userInfo) {
    throw new NotFound('The User does not exist');
  }

  return userInfo;
};

export { searchUsersService, getUserInfoService };
