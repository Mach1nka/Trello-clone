import { Request } from 'express';

interface UserPayload {
  userId: string;
  login: string;
}

const getUserPayload = (request: Request): UserPayload => {
  const { login, id } = request.user!;
  return { login, userId: id };
};

export default getUserPayload;
