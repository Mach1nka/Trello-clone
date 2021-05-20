import express from 'express';
import passport from 'passport';
import {
  getColumns,
  createNewColumn,
  updateColumnName,
  updateColumnPosition,
  deleteColumn
} from '../controllers/columns';

const router = express.Router();

router.get('/columns/:boardId', passport.authenticate('jwt', { session: false }), getColumns);
router.post('/column', passport.authenticate('jwt', { session: false }), createNewColumn);
router.patch('/column/name', passport.authenticate('jwt', { session: false }), updateColumnName);
router.put(
  '/column/position',
  passport.authenticate('jwt', { session: false }),
  updateColumnPosition
);
router.delete('/column', passport.authenticate('jwt', { session: false }), deleteColumn);

export { router };
