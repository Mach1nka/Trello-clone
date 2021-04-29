import express from 'express';
import passport from 'passport';
import { getAllBoards, createNewBoard, deleteBoard } from '../controllers/boards';

const router = express.Router();

router.get('/boards', passport.authenticate('jwt', { session: false }), getAllBoards);
router.post('/board', passport.authenticate('jwt', { session: false }), createNewBoard);
router.delete('/board', passport.authenticate('jwt', { session: false }), deleteBoard);

export { router };
