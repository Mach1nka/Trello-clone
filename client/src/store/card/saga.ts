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
  putUpdatedCardsPos,
  Card,
  DataForCreatingCard,
  DataForRenamingCard,
  DataForUpdatingCardDesc,
  DataForUpdatingCardPos,
  DataForUpdatingCardStatus,
  DataForDeletingCard
} from './actions';
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
  const data: Card[] | number = yield call(getCards, columnData.payload);
  if (data.statusCode === 401) {
    removeAuthDataFromLocalStorage();
    resetStore();
  } else {
    yield put(putCards(data.data));
  }
}

function* watchGetCards(): SagaIterator {
  yield takeEvery(GET_CARDS, workerGetCards);
}

function* workerCreateCard(columnData: { type: string; payload: DataForCreatingCard }) {
  const data: Card | number = yield call(createCard, columnData.payload);
  if (data.statusCode === 401) {
    removeAuthDataFromLocalStorage();
    resetStore();
  } else {
    yield put(putCreatedCard(data.data));
  }
}

function* watchCreateCard(): SagaIterator {
  yield takeEvery(CREATE_CARD, workerCreateCard);
}

function* workerRenameCard(columnData: { type: string; payload: DataForRenamingCard }) {
  const data: Card | number = yield call(updateCardName, columnData.payload);
  if (data.statusCode === 401) {
    removeAuthDataFromLocalStorage();
    resetStore();
  } else {
    yield put(putUpdatedCard(data.data));
  }
}

function* watchRenameCard(): SagaIterator {
  yield takeEvery(RENAME_CARD, workerRenameCard);
}

function* workerChangeCardDesc(columnData: { type: string; payload: DataForUpdatingCardDesc }) {
  const data: Card | number = yield call(updateCardDescription, columnData.payload);
  if (data.statusCode === 401) {
    removeAuthDataFromLocalStorage();
    resetStore();
  } else {
    yield put(putUpdatedCard(data.data));
  }
}

function* watchChangeCardDesc(): SagaIterator {
  yield takeEvery(CHANGE_CARD_DESCRIPTION, workerChangeCardDesc);
}

function* workerChangeCardStatus(columnData: { type: string; payload: DataForUpdatingCardStatus }) {
  yield call(updateCardStatus, columnData.payload);
  const updatedColumn: Card[] | number = yield call(getCards, columnData.payload.columnId);
  const columnWithNewCard: Card[] | number = yield call(getCards, columnData.payload.newColumnId);
  if (updatedColumn.statusCode === 401 || columnWithNewCard.statusCode === 401) {
    removeAuthDataFromLocalStorage();
    resetStore();
  } else {
    yield put(putCards(updatedColumn.data));
    yield put(putCards(columnWithNewCard.data));
  }
}

function* watchChangeCardStatus(): SagaIterator {
  yield takeEvery(CHANGE_CARD_STATUS, workerChangeCardStatus);
}

function* workerChangeCardPos(columnData: { type: string; payload: DataForUpdatingCardPos }) {
  const data: Card[] | number = yield call(updateCardPosition, columnData.payload);
  if (data.statusCode === 401) {
    removeAuthDataFromLocalStorage();
    resetStore();
  } else {
    yield put(putUpdatedCardsPos(data.data));
  }
}

function* watchChangeCardPos(): SagaIterator {
  yield takeEvery(CHANGE_CARD_POSITION, workerChangeCardPos);
}

function* workerDeleteCard(columnData: { type: string; payload: DataForDeletingCard }) {
  yield call(deleteCard, columnData.payload);
  const data: Card[] | number = yield call(getCards, columnData.payload.columnId);
  if (data.statusCode === 401) {
    removeAuthDataFromLocalStorage();
    resetStore();
  } else {
    yield put(putCards(data.data));
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
