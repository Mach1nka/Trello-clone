import express from 'express';
import passport from 'passport';
import {
  getAllBoards,
  createNewBoard,
  deleteBoard,
  updateBoardName,
  shareBoard
} from '../controllers/boards';

const router = express.Router();

router.get('/boards', passport.authenticate('jwt', { session: false }), getAllBoards);
router.post('/board', passport.authenticate('jwt', { session: false }), createNewBoard);
router.patch('/board/rename', passport.authenticate('jwt', { session: false }), updateBoardName);
router.patch('/board/share', passport.authenticate('jwt', { session: false }), shareBoard);
router.delete('/board', passport.authenticate('jwt', { session: false }), deleteBoard);

export { router };
