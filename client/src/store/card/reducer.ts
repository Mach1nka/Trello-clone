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
  [x: string]: Card[];
}

const cardDataIS: CardData = {};

const cardsData = (
  state = cardDataIS,
  { type, payload }: { type: string; payload: DataFromServer | Card }
): CardData => {
  switch (type) {
    case PUT_CARDS:
      return {
        ...state,
        [payload.columnId]: payload.cards as Card[]
      };

    case PUT_CREATED_CARD:
      if (payload.hasOwnProperty('id')) {
        return {
          ...state,
          [payload.columnId]: state[payload.columnId]
            ? state[payload.columnId].concat(payload as Card)
            : [payload as Card]
        };
      }
      return { ...state };
    case PUT_UPDATED_CARD:
      if (payload.hasOwnProperty('id')) {
        return {
          ...state,
          [payload.columnId]: replaceCardDescription(state, payload as Card)
        };
      }
      return { ...state };
    case PUT_CARDS_WITH_NEW_POSITION:
      if (payload.hasOwnProperty('columnId')) {
        return {
          ...state,
          [payload.columnId]: payload.cards as Card[]
        };
      }
      return { ...state };
    case DELETE_CARDS_DATA:
      return { ...state, ...cardDataIS };
    default:
      return state;
  }
};

export default cardsData;
