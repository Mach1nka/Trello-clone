import { Repository } from 'typeorm';

import DBConnector from './connector';
import { User } from '../entities/user';
import { Board } from '../entities/board';

const userRepository = (): Repository<User> => DBConnector.connector.getRepository(User);

const boardRepository = (): Repository<Board> => DBConnector.connector.getRepository(Board);

export { userRepository, boardRepository };
