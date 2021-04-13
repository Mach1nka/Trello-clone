import mongoose from 'mongoose';
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/user';

interface Candidate {
  _id: mongoose.Types.ObjectId;
  login: string;
  password: string;
  __v: number;
}

const register = async (req: Request, res: Response): Promise<void> => {
  const { login, password }: { login: string; password: string } = req.body;
  const candidate: Candidate | null = await User.findOne({ login });
  if (!candidate) {
    const salt = bcrypt.genSaltSync(10);
    const user = new User({
      login,
      password: bcrypt.hashSync(password, salt)
    });
    try {
      await user.save();
      res.status(201).end();
    } catch (error) {
      console.log(error);
      res.status(500).end();
    }
  } else {
    res.status(409).json({ message: 'user has been registered' });
  }
};

export { register };