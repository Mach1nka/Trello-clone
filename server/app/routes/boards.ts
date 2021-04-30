import express from 'express';
import passport from 'passport';
import { getAllBoards, createNewBoard, deleteBoard, updateBoardName } from '../controllers/boards';

const router = express.Router();

router.get('/boards', passport.authenticate('jwt', { session: false }), getAllBoards);
router.post('/board', passport.authenticate('jwt', { session: false }), createNewBoard);
router.patch('/board', passport.authenticate('jwt', { session: false }), updateBoardName);
router.delete('/board', passport.authenticate('jwt', { session: false }), deleteBoard);

export { router };
