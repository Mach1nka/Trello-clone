import { Repository } from 'typeorm';

import DBConnector from './connector';
import { User } from '../entities/user';
import { Board } from '../entities/board';
import { BoardColumn } from '../entities/column';

const userRepository = (): Repository<User> => DBConnector.connector.getRepository(User);

const boardRepository = (): Repository<Board> => DBConnector.connector.getRepository(Board);

const columnRepository = (): Repository<BoardColumn> =>
  DBConnector.connector.getRepository(BoardColumn);

export { userRepository, boardRepository, columnRepository };
