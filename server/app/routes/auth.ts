import express from 'express';
import { logIn, register } from '../controllers/auth';

const router = express.Router();

router.post('/auth/login', logIn);

router.post('/auth/sign-up', register);

export { router };
