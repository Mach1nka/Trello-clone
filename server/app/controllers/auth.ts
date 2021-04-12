import { Request, Response } from 'express';
import User from '../models/user';

const register = async (req: Request, res: Response): Promise<void> => {
  const { login, password }: { login: string; password: string } = req.body;
  const candidate: boolean = await User.findOne({ login });
  if (!candidate) {
    const user = new User({
      login,
      password
    });
    try {
      await user.save(user);
      res.status(201).end();
    } catch (error) {
      console.log(error);
      res.status(400).end();
    }
  } else {
    res.status(400).json({ message: 'user has been registered' });
  }
};

export { register };
