import express from 'express';
import passport from 'passport';
import {
  getCards,
  createNewCard,
  updateCardDescription,
  updateCardPosition,
  deleteCard
} from '../controllers/cards';

const router = express.Router();

router.get('/cards/:columnId', passport.authenticate('jwt', { session: false }), getCards);
router.post('/card', passport.authenticate('jwt', { session: false }), createNewCard);
router.patch(
  '/card/description',
  passport.authenticate('jwt', { session: false }),
  updateCardDescription
);
router.patch(
  '/card/position',
  passport.authenticate('jwt', { session: false }),
  updateCardPosition
);
router.delete('/card', passport.authenticate('jwt', { session: false }), deleteCard);

export { router };
