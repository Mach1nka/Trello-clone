import { userRepository } from '../database/repositories';
import { User } from '../entities/user';

async function getUsersService(searchedValue: string, userId: string): Promise<User[]> {
  const users: User[] = await userRepository()
    .createQueryBuilder('users')
    .where('users.login ILIKE :searchValue', { searchValue: `%${searchedValue}%` })
    .andWhere('users.id != :userId', { userId })
    .select(['users.login', 'users.id'])
    .getMany();

  return users;
}

export default getUsersService;
