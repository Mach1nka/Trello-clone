import { ReqUserPayload } from '../types/auth/interfaces';
import { CustomRequest } from '../types/common';

const getUserPayload = (request: CustomRequest): ReqUserPayload => {
  const { login, id } = request.user!;
  return { login, userId: id };
};

export default getUserPayload;
