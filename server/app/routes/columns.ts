import express from 'express';
import passport from 'passport';
import { check } from 'express-validator';

import {
  getColumns,
  createNewColumn,
  updateColumnName,
  updateColumnPosition,
  deleteColumn
} from '../controllers/columns';

const router = express.Router();

router.get('/columns/:boardId', passport.authenticate('jwt', { session: false }), getColumns);
router.post(
  '/column',
  [
    check('boardId', 'Board Id is required').exists(),
    check('name', 'Name is required').exists(),
    check('position', 'Position is required').exists().isNumeric(),
    passport.authenticate('jwt', { session: false })
  ],
  createNewColumn
);
router.patch(
  '/column/name',
  [
    check('columnId', 'Column Id is required').exists(),
    check('newName', 'New name is required').exists(),
    passport.authenticate('jwt', { session: false })
  ],
  updateColumnName
);
router.put(
  '/column/position',
  passport.authenticate('jwt', { session: false }),
  updateColumnPosition
);
router.delete('/column', passport.authenticate('jwt', { session: false }), deleteColumn);

export { router };
