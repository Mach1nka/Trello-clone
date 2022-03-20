import { Repository } from 'typeorm';

import DBConnector from './connector';
import { User } from '../entities/user';

const userRepository = (): Repository<User> => DBConnector.connector.getRepository(User);

export { userRepository };
