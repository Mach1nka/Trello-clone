import express from 'express';
import passport from 'passport';
import { check } from 'express-validator';

import {
  getCards,
  createNewCard,
  updateCardName,
  updateCardDescription,
  updateCardPosition,
  changeCardStatus,
  deleteCard
} from '../controllers/cards';

const router = express.Router();

router.get('/cards/:columnId', passport.authenticate('jwt', { session: false }), getCards);

router.post(
  '/card',
  [
    check('columnId', 'Card Id is required').exists(),
    check('name', 'Name is required').exists(),
    check('position', 'Position is required').exists().isNumeric(),
    passport.authenticate('jwt', { session: false })
  ],
  createNewCard
);
router.patch(
  '/card/description',
  [
    check('cardId', 'Card Id is required').exists(),
    passport.authenticate('jwt', { session: false })
  ],
  updateCardDescription
);

router.patch(
  '/card/name',
  [
    check('cardId', 'Card Id is required').exists(),
    check('newName', 'New name is required').exists(),
    passport.authenticate('jwt', { session: false })
  ],
  updateCardName
);

router.put(
  '/card/position',
  [
    check('cardId', 'Card Id is required').exists(),
    check('columnId', 'Column Id is required').exists(),
    check('newPosition', 'New position Id is required').exists().isNumeric(),
    passport.authenticate('jwt', { session: false })
  ],
  updateCardPosition
);

router.put(
  '/card/status',
  [
    check('cardId', 'Card Id is required').exists(),
    check('columnId', 'Column Id is required').exists(),
    check('newColumnId', 'New column is required').exists(),
    passport.authenticate('jwt', { session: false })
  ],
  changeCardStatus
);

router.delete('/card', passport.authenticate('jwt', { session: false }), deleteCard);

export { router };
