import express from 'express';

import { getUsers } from '../controllers/users';
import { jwtAuthenticate } from '../middleware/passport';

const router = express.Router();

router.get('/users/:searchedValue', jwtAuthenticate, getUsers);

export { router };
