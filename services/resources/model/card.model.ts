export enum CardActions {
  PUT_CARDS = 'PUT_CARDS',
  PUT_CREATED_CARD = 'PUT_CREATED_CARD',
  PUT_UPDATED_CARD = 'PUT_UPDATED_CARD',
  DELETE_COLUMN_CARDS = 'DELETE_COLUMN_CARDS',
  RESET_CARDS_DATA = 'RESET_CARDS_DATA',
}

export interface Card {
  id: string;
  name: string;
  description: string;
  columnId: string;
  position: number;
}

export interface DataForCreatingCard {
  columnId: string;
  description: string;
  name: string;
}

export interface DataForRenamingCard {
  cardId: string;
  newName: string;
}

export interface DataForUpdatingCardDesc {
  cardId: string;
  newDescription: string;
}

export interface DataForUpdatingCardPos {
  columnId: string;
  cardId: string;
  newPosition: number;
}

export interface DataForUpdatingCardStatus {
  columnId: string;
  cardId: string;
  newColumnId: string;
  newPosition?: number;
}

export interface DataForDeletingCard {
  columnId: string;
  cardId: string;
}

export interface CardDataServer {
  columnId: string;
  cards: Card[];
}

export interface CardData {
  cards: {
    [x: string]: Card[];
  };
}

export const updateCardData = (state: CardData, payload: Card): Card[] =>
  state.cards[payload.columnId].map((el: Card) =>
    el.id === payload.id
      ? {
          id: payload.id,
          description: payload.description,
          columnId: payload.columnId,
          name: payload.name,
          position: el.position,
        }
      : el
  );
