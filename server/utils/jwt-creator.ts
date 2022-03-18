import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import CONFIG from '../config';

const jwtCreator = (login: string, userId: mongoose.Types.ObjectId): string => {
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
