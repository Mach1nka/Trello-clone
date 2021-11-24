export enum CardTypes {
  PUT_CARDS = 'PUT_CARDS',
  PUT_CREATED_CARD = 'PUT_CREATED_CARD',
  PUT_UPDATED_CARD = 'PUT_UPDATED_CARD',
  PUT_CARDS_WITH_NEW_POSITION = 'PUT_CARDS_WITH_NEW_POSITION',
  DELETE_CARDS_DATA = 'DELETE_CARDS_DATA'
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
  position: number;
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

export interface CardList {
  columnId: string;
  cards: Card[];
}

export interface BaseResponse<T> {
  statusCode: number;
  message?: string;
  data?: T;
}

export type CardActions =
  | { type: CardTypes.PUT_CARDS; payload: CardList }
  | { type: CardTypes.PUT_CREATED_CARD; payload: Card }
  | { type: CardTypes.PUT_UPDATED_CARD; payload: Card }
  | { type: CardTypes.PUT_CARDS_WITH_NEW_POSITION; payload: CardList }
  | { type: CardTypes.DELETE_CARDS_DATA };
