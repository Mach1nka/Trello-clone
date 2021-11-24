import { Card, CardTypes, CardActions } from './types';
import replaceCardDescription from '../../../utils/replace-card-description';

export interface CardData {
  [x: string]: Card[];
}

const initialCardsState: CardData = {};

const cardsData = (state = initialCardsState, action: CardActions): CardData => {
  switch (action.type) {
    case CardTypes.PUT_CARDS:
      return {
        ...state,
        [action.payload.columnId]: action.payload.cards
      };

    case CardTypes.PUT_CREATED_CARD:
      return {
        ...state,
        [action.payload.columnId]: state[action.payload.columnId]
          ? state[action.payload.columnId].concat(action.payload)
          : [action.payload as Card]
      };
    case CardTypes.PUT_UPDATED_CARD:
      return {
        ...state,
        [action.payload.columnId]: replaceCardDescription(state, action.payload)
      };
    case CardTypes.PUT_CARDS_WITH_NEW_POSITION:
      return {
        ...state,
        [action.payload.columnId]: action.payload.cards
      };
    case CardTypes.DELETE_CARDS_DATA:
      return { ...state, ...initialCardsState };
    default:
      return state;
  }
};

export default cardsData;
