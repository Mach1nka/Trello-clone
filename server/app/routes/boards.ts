import express from 'express';
import { body, param } from 'express-validator';

import {
  getAllBoards,
  createNewBoard,
  deleteBoard,
  updateBoardName,
  shareBoard
} from '../controllers/boards';
import { jwtAuthenticate } from '../middleware/passport';
import userPermission from '../middleware/permission';

const router = express.Router();

router.get('/boards', jwtAuthenticate, getAllBoards);

router.post('/board', [body('name', 'Name is required').exists(), jwtAuthenticate], createNewBoard);

router.patch(
  '/board/name',
  [
    body('boardId', 'Board Id is required').exists(),
    body('newName', 'New name is required').exists(),
    jwtAuthenticate,
    userPermission
  ],
  updateBoardName
);

router.patch(
  '/board/share',
  [
    body('boardId', 'Board Id is required').exists(),
    body('newParticipantId', 'User Id is required').exists(),
    jwtAuthenticate,
    userPermission
  ],
  shareBoard
);

router.delete(
  '/board',
  [param('boardId', 'Board Id is required').exists(), jwtAuthenticate, userPermission],
  deleteBoard
);

export { router };
