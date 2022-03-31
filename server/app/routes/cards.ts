import express from 'express';
import { body, param } from 'express-validator';

import {
  getCards,
  createNewCard,
  updateCardName,
  updateCardDescription,
  updateCardPosition,
  transferCard,
  deleteCard
} from '../controllers/cards';
import { jwtAuthenticate } from '../middleware/passport';

const router = express.Router();

router.get(
  '/cards/:columnId',
  [param('columnId', 'Column Id is required').exists(), jwtAuthenticate],
  getCards
);

router.post(
  '/card',
  [
    body('columnId', 'Card Id is required').exists(),
    body('name', 'Name is required').exists(),
    jwtAuthenticate
  ],
  createNewCard
);
router.patch(
  '/card/description',
  [body('cardId', 'Card Id is required').exists(), jwtAuthenticate],
  updateCardDescription
);

router.patch(
  '/card/name',
  [
    body('cardId', 'Card Id is required').exists(),
    body('newName', 'New name is required').exists(),
    jwtAuthenticate
  ],
  updateCardName
);

router.put(
  '/card/position',
  [
    body('cardId', 'Card Id is required').exists(),
    body('columnId', 'Column Id is required').exists(),
    body('newPosition', 'New position Id is required').exists().isNumeric(),
    jwtAuthenticate
  ],
  updateCardPosition
);

router.put(
  '/card/transferring',
  [
    body('cardId', 'Card Id is required').exists(),
    body('columnId', 'Column Id is required').exists(),
    body('newColumnId', 'New column is required').exists(),
    jwtAuthenticate
  ],
  transferCard
);

router.delete(
  '/card',
  [
    param('columnId', 'Column Id is required').exists(),
    param('cardId', 'Card Id is required').exists(),
    jwtAuthenticate
  ],
  deleteCard
);

export { router };
