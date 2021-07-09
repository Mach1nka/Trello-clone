import { takeEvery, call, put } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
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
  BaseResponse,
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
import resetStore from '../../../utils/reset-store';
import { removeAuthDataFromLocalStorage } from '../../../utils/auth-data-localstorage';

function* workerGetCards(columnData: { type: string; payload: string }): SagaIterator {
  const response: BaseResponse<CardList> = yield call(getCards, columnData.payload);

  if (response.data) {
    yield put(putCards(response.data));
  }

  if (response.statusCode === 401) {
    removeAuthDataFromLocalStorage();
    resetStore();
  }
}

function* watchGetCards(): SagaIterator {
  yield takeEvery(GET_CARDS, workerGetCards);
}

function* workerCreateCard(columnData: { type: string; payload: DataForCreatingCard }) {
  const response: BaseResponse<Card> = yield call(createCard, columnData.payload);

  if (response.data) {
    yield put(putCreatedCard(response.data));
  }

  if (response.statusCode === 401) {
    removeAuthDataFromLocalStorage();
    resetStore();
  }
}

function* watchCreateCard(): SagaIterator {
  yield takeEvery(CREATE_CARD, workerCreateCard);
}

function* workerRenameCard(columnData: { type: string; payload: DataForRenamingCard }) {
  const response: BaseResponse<Card> = yield call(updateCardName, columnData.payload);
  if (response.data) {
    yield put(putUpdatedCard(response.data));
  }

  if (response.statusCode === 401) {
    removeAuthDataFromLocalStorage();
    resetStore();
  }
}

function* watchRenameCard(): SagaIterator {
  yield takeEvery(RENAME_CARD, workerRenameCard);
}

function* workerChangeCardDesc(columnData: { type: string; payload: DataForUpdatingCardDesc }) {
  const response: BaseResponse<Card> = yield call(updateCardDescription, columnData.payload);
  if (response.data) {
    yield put(putUpdatedCard(response.data));
  }

  if (response.statusCode === 401) {
    removeAuthDataFromLocalStorage();
    resetStore();
  }
}

function* watchChangeCardDesc(): SagaIterator {
  yield takeEvery(CHANGE_CARD_DESCRIPTION, workerChangeCardDesc);
}

function* workerChangeCardStatus(columnData: { type: string; payload: DataForUpdatingCardStatus }) {
  yield call(updateCardStatus, columnData.payload);

  const updatedColumn: BaseResponse<CardList> = yield call(getCards, columnData.payload.columnId);
  const columnWithNewCard: BaseResponse<CardList> = yield call(
    getCards,
    columnData.payload.newColumnId
  );

  if (updatedColumn.data && columnWithNewCard.data) {
    yield put(putCards(updatedColumn.data));
    yield put(putCards(columnWithNewCard.data));
  }

  if (updatedColumn.statusCode === 401 || columnWithNewCard.statusCode === 401) {
    removeAuthDataFromLocalStorage();
    resetStore();
  }
}

function* watchChangeCardStatus(): SagaIterator {
  yield takeEvery(CHANGE_CARD_STATUS, workerChangeCardStatus);
}

function* workerChangeCardPos(columnData: { type: string; payload: DataForUpdatingCardPos }) {
  const response: BaseResponse<CardList> = yield call(updateCardPosition, columnData.payload);

  if (response.data) {
    yield put(putUpdatedCardsPos(response.data));
  }

  if (response.statusCode === 401) {
    removeAuthDataFromLocalStorage();
    resetStore();
  }
}

function* watchChangeCardPos(): SagaIterator {
  yield takeEvery(CHANGE_CARD_POSITION, workerChangeCardPos);
}

function* workerDeleteCard(columnData: { type: string; payload: DataForDeletingCard }) {
  yield call(deleteCard, columnData.payload);

  const response: BaseResponse<CardList> = yield call(getCards, columnData.payload.columnId);

  if (response.data) {
    yield put(putCards(response.data));
  }

  if (response.statusCode === 401) {
    removeAuthDataFromLocalStorage();
    resetStore();
  }
}

function* watchDeleteCard(): SagaIterator {
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
