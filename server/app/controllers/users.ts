import { Request, Response } from 'express';
import User from '../models/user';
import { PassportUser } from '../../types/types';

const getUsers = async (req: Request, res: Response): Promise<void> => {
  const { _id } = req.user as PassportUser;
  const { searchValue } = req.params;
  const regex = new RegExp(searchValue);

  if (searchValue === '') {
    res.status(400).end();
  }

  try {
    const allUsers = await User.find({ login: { $regex: regex, $options: 'i' } });
    const filteredUsers = allUsers.filter((el) => el._id.toString() !== _id.toString());
    const preparedData = filteredUsers.map((el) => ({
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
