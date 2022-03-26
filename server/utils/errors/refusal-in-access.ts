import { CommonError } from '../../types/errors';

class RefusalInAccess extends CommonError {
  constructor(message = 'You don not have permissions', statusCode = 403) {
    super(message, statusCode);
  }
}

export default RefusalInAccess;
