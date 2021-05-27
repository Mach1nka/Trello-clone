import {
  PUT_CARDS,
  PUT_CREATED_CARD,
  PUT_UPDATED_CARD,
  PUT_CARDS_WITH_NEW_POSITION,
  DELETE_CARDS_DATA,
  Card
} from './actions';
import replaceCardDescription from '../../../utils/replace-card-description';

export interface DataFromServer {
  columnId: string;
  cards: Card[];
}

export interface CardData {
  cards: {
    [x: string]: Card[];
  };
}

const cardDataIS: CardData = {
  cards: {}
};

const cardData = (
  state = cardDataIS,
  { type, payload }: { type: string; payload: DataFromServer | Card }
): CardData => {
  switch (type) {
    case PUT_CARDS:
      if (payload.hasOwnProperty('columnId')) {
        return {
          ...state,
          cards: {
            ...state.cards,
            [payload.columnId]: payload.cards as Card[]
          }
        };
      }
      return { ...state };
    case PUT_CREATED_CARD:
      if (payload.hasOwnProperty('id')) {
        return {
          ...state,
          cards: {
            ...state.cards,
            [payload.columnId]: state.cards[payload.columnId]
              ? state.cards[payload.columnId].concat(payload as Card)
              : [payload]
          }
        };
      }
      return { ...state };
    case PUT_UPDATED_CARD:
      if (payload.hasOwnProperty('id')) {
        return {
          ...state,
          cards: {
            ...state.cards,
            [payload.columnId]: replaceCardDescription(state, payload as Card)
          }
        };
      }
      return { ...state };
    case PUT_CARDS_WITH_NEW_POSITION:
      if (payload.hasOwnProperty('columnId')) {
        return {
          ...state,
          cards: {
            ...state.cards,
            [payload.columnId]: payload.cards as Card[]
          }
        };
      }
      return { ...state };
    case DELETE_CARDS_DATA:
      return { ...state, ...cardDataIS };
    default:
      return state;
  }
};

export default cardData;
