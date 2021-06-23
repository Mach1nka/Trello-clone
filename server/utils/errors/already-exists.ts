import { Error } from '../../types/errors';

class AlreadyExists extends Error {
  constructor(message = 'User already exists', statusCode = 400) {
    super(message, statusCode);
  }
}

export default AlreadyExists;
