import { userRepository } from '../database/repositories';
import { User } from '../entities/user';
import { ParamsForSearching } from '../../types/users/interfaces';
import { UserId } from '../../types/auth/interfaces';

async function getUsersService(data: ParamsForSearching & UserId): Promise<User[]> {
  const { searchedValue, userId } = data;

  const users: User[] = await userRepository()
    .createQueryBuilder('users')
    .where('users.login ILIKE :searchValue', { searchValue: `%${searchedValue}%` })
    .andWhere('users.id != :userId', { userId })
    .select(['users.login', 'users.id'])
    .getMany();

  return users;
}

export default getUsersService;
