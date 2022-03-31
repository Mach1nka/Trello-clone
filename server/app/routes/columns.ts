import express from 'express';
import { body, param } from 'express-validator';

import {
  getColumns,
  createNewColumn,
  updateColumnName,
  updateColumnPosition,
  deleteColumn
} from '../controllers/columns';
import { jwtAuthenticate } from '../middleware/passport';

const router = express.Router();

router.get(
  '/columns/:boardId',
  [param('boardId', 'Board Id is required').exists(), jwtAuthenticate],
  getColumns
);

router.post(
  '/column',
  [
    body('boardId', 'Board Id is required').exists(),
    body('name', 'Name is required').exists(),
    jwtAuthenticate
  ],
  createNewColumn
);

router.patch(
  '/column/name',
  [
    body('columnId', 'Column Id is required').exists(),
    body('newName', 'New name is required').exists(),
    jwtAuthenticate
  ],
  updateColumnName
);

router.put(
  '/column/position',
  [
    body('columnId', 'Column Id is required').exists(),
    body('boardId', 'New name is required').exists(),
    body('newPosition', 'New name is required').exists().isNumeric(),
    jwtAuthenticate
  ],
  updateColumnPosition
);

router.delete(
  '/column/:columnId/:boardId',
  [
    param('columnId', 'Column Id is required').exists(),
    param('boardId', 'Board Id is required').exists(),
    jwtAuthenticate
  ],
  deleteColumn
);

export { router };
