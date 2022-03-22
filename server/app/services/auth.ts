import bcrypt from 'bcryptjs';

import { userRepository } from '../database/repositories';
import { User } from '../entities/user';
import InvalidCredentials from '../../utils/errors/invalid-credentials';
import AlreadyExists from '../../utils/errors/already-exists';
import { AuthBody } from '../../types/auth/interfaces';

async function loginService(data: AuthBody): Promise<User> {
  const { login, password } = data;
  const user: User | undefined = await userRepository().findOne({ where: { login } });

  if (!user) {
    throw new InvalidCredentials(undefined, 403);
  }

  const isPasswordEqual = bcrypt.compareSync(password, user.password);

  if (!isPasswordEqual) {
    throw new InvalidCredentials(undefined, 403);
  }

  return user;
}

async function registerService(data: AuthBody): Promise<User> {
  const { login, password } = data;
  const candidate: User | undefined = await userRepository().findOne({ where: { login } });

  if (candidate) {
    throw new AlreadyExists();
  }

  const salt = bcrypt.genSaltSync(10);

  const createdUser = await userRepository().save({
    login,
    password: bcrypt.hashSync(password, salt)
  });

  return createdUser;
}

export { loginService, registerService };
