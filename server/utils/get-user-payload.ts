import { ReqUserPayload } from '../types/auth/interfaces';
import { CustomRequest } from '../types/common';
import InvalidCredentials from './errors/invalid-credentials';

const getUserPayload = (request: CustomRequest): ReqUserPayload => {
  if (!request.user) {
    throw new InvalidCredentials();
  }

  const { login, id } = request.user;
  return { login, userId: id };
};

export default getUserPayload;
