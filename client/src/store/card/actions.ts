import {
  DataForCreatingCard,
  DataForRenamingCard,
  DataForUpdatingCardDesc,
  DataForUpdatingCardPos,
  DataForUpdatingCardStatus,
  DataForDeletingCard,
  CardTypes,
  CardList,
  Card
} from './types';

const GET_CARDS = 'GET_CARDS';
const CREATE_CARD = 'CREATE_CARD';
const RENAME_CARD = 'RENAME_CARD';
const CHANGE_CARD_DESCRIPTION = 'CHANGE_CARD_DESCRIPTION';
const CHANGE_CARD_STATUS = 'CHANGE_CARD_STATUS';
const CHANGE_CARD_POSITION = 'CHANGE_CARD_POSITION';
const DELETE_CARD = 'DELETE_CARD';

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

const putCards = (cards: CardList): { type: string; payload: CardList } => ({
  type: CardTypes.PUT_CARDS,
  payload: cards
});

const putCreatedCard = (newCard: Card): { type: string; payload: Card } => ({
  type: CardTypes.PUT_CREATED_CARD,
  payload: newCard
});

const putUpdatedCard = (updatedCard: Card): { type: string; payload: Card } => ({
  type: CardTypes.PUT_UPDATED_CARD,
  payload: updatedCard
});

const putUpdatedCardsPos = (cardsWithNewPos: CardList): { type: string; payload: CardList } => ({
  type: CardTypes.PUT_CARDS_WITH_NEW_POSITION,
  payload: cardsWithNewPos
});

const deleteCardsData = (): { type: string } => ({ type: CardTypes.DELETE_CARDS_DATA });

export {
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
