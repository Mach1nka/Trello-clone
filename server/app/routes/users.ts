import express from 'express';

import { searchUsers, getUserInfo } from '../controllers/users';
import { jwtAuthenticate } from '../middleware/passport';

const router = express.Router();

router.get('/users/:searchedValue', jwtAuthenticate, searchUsers);

router.get('/user/info', jwtAuthenticate, getUserInfo);

export { router };
