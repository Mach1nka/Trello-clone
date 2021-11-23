import React, { useReducer, Context, createContext, Dispatch } from 'react';

import {
  Card,
  CardDataServer,
  CardActions,
  CardData,
  updateCardData,
} from 'services/resources/model/card.model';

interface PutCardsAction {
  type: CardActions.PUT_CARDS;
  payload: CardDataServer;
}

interface PutCreatedCardAction {
  type: CardActions.PUT_CREATED_CARD;
  payload: Card;
}

interface PutUpdatedAction {
  type: CardActions.PUT_UPDATED_CARD;
  payload: Card;
}

interface DeleteCardsAction {
  type: CardActions.DELETE_CARDS_DATA;
}

export type Action =
  | PutCardsAction
  | PutCreatedCardAction
  | PutUpdatedAction
  | DeleteCardsAction;

interface CardContextValue extends CardData {
  dispatch: Dispatch<Action>;
}

const initialState: CardData = {
  cards: {},
};

function reducer(state: CardData, action: Action): CardData {
  switch (action.type) {
    case CardActions.PUT_CARDS:
      return {
        ...state,
        cards: { [action.payload.columnId]: action.payload.cards },
      };
    case CardActions.PUT_CREATED_CARD:
      return {
        ...state,
        cards: {
          [action.payload.columnId]: state.cards[action.payload.columnId]
            ? state.cards[action.payload.columnId].concat(action.payload)
            : [action.payload],
        },
      };
    case CardActions.PUT_UPDATED_CARD:
      return {
        ...state,
        cards: {
          [action.payload.columnId]: updateCardData(state, action.payload),
        },
      };
    case CardActions.DELETE_CARDS_DATA:
      return { ...state, ...initialState };
    default:
      return state;
  }
}

export const CardContext: Context<CardContextValue> =
  createContext<CardContextValue>({ ...initialState, dispatch: () => {} });

const CardProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <CardContext.Provider value={{ cards: state.cards, dispatch }}>
      {children}
    </CardContext.Provider>
  );
};

export default CardProvider;
