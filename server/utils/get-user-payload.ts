import { UserPayload } from '../types/auth/interfaces';
import { CustomRequest } from '../types/common';

const getUserPayload = (request: CustomRequest): UserPayload => {
  const { login, id } = request.user!;
  return { login, userId: id };
};

export default getUserPayload;
