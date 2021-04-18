import mongoose from 'mongoose';
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/user';
import jwtCreator from '../../utils/jwt-creator';

interface BodyData {
  login: string;
  password: string;
}

interface Candidate extends BodyData {
  _id: mongoose.Types.ObjectId;
  __v: number;
}

const logIn = async (req: Request, res: Response): Promise<void> => {
  const { login, password }: BodyData = req.body;
  const candidate: Candidate | null = await User.findOne({ login });
  if (candidate) {
    const isPasswordEqual: boolean = bcrypt.compareSync(password, candidate.password);
    if (isPasswordEqual) {
      const token = jwtCreator(login, candidate._id);
      res.status(200).json({ token, login });
    } else {
      res.status(409).json({ message: 'invalid password' });
    }
  } else {
    res.status(404).json({ message: 'the user has not been found' });
  }
};

const register = async (req: Request, res: Response): Promise<void> => {
  const { login, password }: BodyData = req.body;
  const candidate: Candidate | null = await User.findOne({ login });
  if (!candidate) {
    const salt = bcrypt.genSaltSync(10);
    const user = new User({
      login,
      password: bcrypt.hashSync(password, salt)
    });
    try {
      await user.save((err: TypeError, model: Candidate) => {
        if (err) {
          console.log(err);
          res.status(500).end();
        }
        const token = jwtCreator(login, model._id);
        res.status(201).json({ token, login });
      });
    } catch (error) {
      console.log(error);
      res.status(500).end();
    }
  } else {
    res.status(409).json({ message: 'the user has been registered' });
  }
};

export { logIn, register };
