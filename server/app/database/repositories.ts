import { Repository } from 'typeorm';

import DBConnector from './connector';
import { User } from '../entities/user';
import { Board } from '../entities/board';
import { BoardColumn as Column } from '../entities/column';
import { Card } from '../entities/card';

const userRepository = (): Repository<User> => DBConnector.connector.getRepository(User);

const boardRepository = (): Repository<Board> => DBConnector.connector.getRepository(Board);

const columnRepository = (): Repository<Column> => DBConnector.connector.getRepository(Column);

const cardRepository = (): Repository<Card> => DBConnector.connector.getRepository(Card);

export { userRepository, boardRepository, columnRepository, cardRepository };
