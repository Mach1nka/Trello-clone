import { Request, Response } from 'express';
import User from '../models/user';

const getUsers = async (_req: Request, res: Response): Promise<void> => {
  try {
    const allUsers = await User.find({});
    const preparedData = allUsers.map((el) => ({
      id: el._id,
      login: el.login
    }));
    res.status(200).json(preparedData);
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
};

export { getUsers };
