import { Error } from '../../types/errors';

class NotFound extends Error {
  constructor(message = 'Not Found', statusCode = 404) {
    super(message, statusCode);
  }
}

export default NotFound;
