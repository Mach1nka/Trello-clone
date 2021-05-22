const PUT_CARDS = 'PUT_CARDS';
const PUT_CREATED_CARD = 'PUT_CREATED_CARD';
const PUT_UPDATED_CARD = 'PUT_UPDATED_CARD';
const PUT_CARDS_WITH_NEW_POSITION = 'PUT_CARDS_WITH_NEW_POSITION';
const CHANGE_CARD_STATUS = 'CHANGE_CARD_STATUS';
const DELETE_CARDS_DATA = 'DELETE_CARDS_DATA';

const GET_CARDS = 'GET_CARDS';
const CREATE_CARD = 'CREATE_CARD';
const RENAME_CARD = 'RENAME_CARD';
const CHANGE_CARD_DESCRIPTION = 'CHANGE_CARD_DESCRIPTION';
const CHANGE_CARD_POSITION = 'CHANGE_CARD_POSITION';
const DELETE_CARD = 'DELETE_CARD';

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

const getCards = (columnId: string): { type: string; payload: string } => ({
  type: GET_CARDS,
  payload: columnId
});

const createCard = (data: DataForCreatingCard): { type: string; payload: DataForCreatingCard } => ({
  type: CREATE_CARD,
  payload: data
});

const renameCard = (data: DataForRenamingCard): { type: string; payload: DataForRenamingCard } => ({
  type: RENAME_CARD,
  payload: data
});

const changeCardDescription = (
  data: DataForUpdatingCardDesc
): { type: string; payload: DataForUpdatingCardDesc } => ({
  type: CHANGE_CARD_DESCRIPTION,
  payload: data
});

const changeCardPosition = (
  data: DataForUpdatingCardPos
): { type: string; payload: DataForUpdatingCardPos } => ({
  type: CHANGE_CARD_POSITION,
  payload: data
});

const changeCardStatus = (
  data: DataForUpdatingCardStatus
): { type: string; payload: DataForUpdatingCardStatus } => ({
  type: CHANGE_CARD_STATUS,
  payload: data
});

const deleteCard = (data: DataForDeletingCard): { type: string; payload: DataForDeletingCard } => ({
  type: DELETE_CARD,
  payload: data
});

const putCards = (cards: Card[]): { type: string; payload: Card[] } => ({
  type: PUT_CARDS,
  payload: cards
});

const putCreatedCard = (newCard: Card): { type: string; payload: Card } => ({
  type: PUT_CREATED_CARD,
  payload: newCard
});

const putUpdatedCard = (updatedCard: Card): { type: string; payload: Card } => ({
  type: PUT_UPDATED_CARD,
  payload: updatedCard
});

const putUpdatedCardsPos = (cardsWithNewPos: Card[]): { type: string; payload: Card[] } => ({
  type: PUT_CARDS_WITH_NEW_POSITION,
  payload: cardsWithNewPos
});

const deleteCardsData = (): { type: string } => ({ type: DELETE_CARDS_DATA });

export {
  PUT_CARDS,
  PUT_CREATED_CARD,
  PUT_UPDATED_CARD,
  PUT_CARDS_WITH_NEW_POSITION,
  DELETE_CARDS_DATA,
  GET_CARDS,
  CREATE_CARD,
  RENAME_CARD,
  CHANGE_CARD_DESCRIPTION,
  CHANGE_CARD_POSITION,
  CHANGE_CARD_STATUS,
  DELETE_CARD,
  getCards,
  createCard,
  renameCard,
  changeCardDescription,
  changeCardPosition,
  changeCardStatus,
  deleteCard,
  putCards,
  putCreatedCard,
  putUpdatedCard,
  putUpdatedCardsPos,
  deleteCardsData
};
