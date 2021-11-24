import { takeEvery, ForkEffect } from 'redux-saga/effects';

import {
  GET_CARDS,
  CREATE_CARD,
  RENAME_CARD,
  CHANGE_CARD_DESCRIPTION,
  CHANGE_CARD_POSITION,
  CHANGE_CARD_STATUS,
  DELETE_CARD,
  putCards,
  putCreatedCard,
  putUpdatedCard,
  putUpdatedCardsPos
} from './actions';
import {
  DataForCreatingCard,
  DataForRenamingCard,
  DataForUpdatingCardDesc,
  DataForUpdatingCardPos,
  DataForUpdatingCardStatus,
  DataForDeletingCard,
  CardList,
  Card
} from './types';
import {
  getCards,
  createCard,
  updateCardName,
  updateCardDescription,
  updateCardPosition,
  updateCardStatus,
  deleteCard
} from '../../api/card-requests';
import handleSagaRequest from '../../../utils/handle-saga-request';

function* workerGetCards(columnData: { type: string; payload: string }) {
  yield handleSagaRequest<string, CardList>(getCards, columnData.payload, putCards);
  // const response: BaseResponse<CardList> = yield call(getCards, columnData.payload);
}

function* watchGetCards(): Generator<ForkEffect> {
  yield takeEvery(GET_CARDS, workerGetCards);
}

function* workerCreateCard(columnData: { type: string; payload: DataForCreatingCard }) {
  yield handleSagaRequest<DataForCreatingCard, Card>(
    createCard,
    columnData.payload,
    putCreatedCard
  );
  // const response: BaseResponse<Card> = yield call(createCard, columnData.payload);
}

function* watchCreateCard(): Generator<ForkEffect> {
  yield takeEvery(CREATE_CARD, workerCreateCard);
}

function* workerRenameCard(columnData: { type: string; payload: DataForRenamingCard }) {
  yield handleSagaRequest<DataForRenamingCard, Card>(
    updateCardName,
    columnData.payload,
    putUpdatedCard
  );
  // const response: BaseResponse<Card> = yield call(updateCardName, columnData.payload);
}

function* watchRenameCard(): Generator<ForkEffect> {
  yield takeEvery(RENAME_CARD, workerRenameCard);
}

function* workerChangeCardDesc(columnData: { type: string; payload: DataForUpdatingCardDesc }) {
  yield handleSagaRequest<DataForUpdatingCardDesc, Card>(
    updateCardDescription,
    columnData.payload,
    putUpdatedCard
  );
  // const response: BaseResponse<Card> = yield call(updateCardDescription, columnData.payload);
}

function* watchChangeCardDesc(): Generator<ForkEffect> {
  yield takeEvery(CHANGE_CARD_DESCRIPTION, workerChangeCardDesc);
}

function* workerChangeCardStatus(columnData: { type: string; payload: DataForUpdatingCardStatus }) {
  yield handleSagaRequest<DataForUpdatingCardStatus, Record<string, never>>(
    updateCardStatus,
    columnData.payload
  );

  yield handleSagaRequest<string, CardList>(getCards, columnData.payload.columnId, putCards);
  yield handleSagaRequest<string, CardList>(getCards, columnData.payload.newColumnId, putCards);

  // yield call(updateCardStatus, columnData.payload);
  // const updatedColumn: BaseResponse<CardList> = yield call(getCards, columnData.payload.columnId);
  // const columnWithNewCard: BaseResponse<CardList> = yield call(
  //   getCards,
  //   columnData.payload.newColumnId
  // );
}

function* watchChangeCardStatus(): Generator<ForkEffect> {
  yield takeEvery(CHANGE_CARD_STATUS, workerChangeCardStatus);
}

function* workerChangeCardPos(columnData: { type: string; payload: DataForUpdatingCardPos }) {
  yield handleSagaRequest<DataForUpdatingCardPos, CardList>(
    updateCardPosition,
    columnData.payload,
    putUpdatedCardsPos
  );

  // const response: BaseResponse<CardList> = yield call(updateCardPosition, columnData.payload);
}

function* watchChangeCardPos(): Generator<ForkEffect> {
  yield takeEvery(CHANGE_CARD_POSITION, workerChangeCardPos);
}

function* workerDeleteCard(columnData: { type: string; payload: DataForDeletingCard }) {
  yield handleSagaRequest<DataForDeletingCard, Record<string, never>>(
    deleteCard,
    columnData.payload
  );
  yield handleSagaRequest<string, CardList>(getCards, columnData.payload.columnId, putCards);

  // yield call(deleteCard, columnData.payload);
  // const response: BaseResponse<CardList> = yield call(getCards, columnData.payload.columnId)
}

function* watchDeleteCard(): Generator<ForkEffect> {
  yield takeEvery(DELETE_CARD, workerDeleteCard);
}

export {
  watchGetCards,
  watchCreateCard,
  watchRenameCard,
  watchChangeCardPos,
  watchChangeCardDesc,
  watchChangeCardStatus,
  watchDeleteCard
};
