import express from 'express';
import { check } from 'express-validator';

import { logIn, register } from '../controllers/auth';

const router = express.Router();

router.post(
  '/auth/login',
  [
    check('login', 'Please include a valid email').exists(),
    check('password', 'Password is required').exists()
  ],
  logIn
);

router.post('/auth/sign-up', register);

export { router };
