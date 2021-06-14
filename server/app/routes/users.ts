import express from 'express';
import passport from 'passport';
import { getUsers } from '../controllers/users';

const router = express.Router();

router.get('/users', passport.authenticate('jwt', { session: false }), getUsers);

export { router };
