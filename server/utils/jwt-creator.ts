import jwt from 'jsonwebtoken';
import CONFIG from '../config';

const jwtCreator = (login: string, userId: string): string => {
  const token = `Bearer ${jwt.sign(
    {
      login,
      userId
    },
    CONFIG.JWT_SECRET_KEY,
    { expiresIn: '1h' }
  )}`;
  return token;
};

export default jwtCreator;
