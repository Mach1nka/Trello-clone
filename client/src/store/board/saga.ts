import { takeEvery, call, put } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';

import {
  DELETE_BOARD,
  GET_BOARDS,
  CREATE_BOARD,
  RENAME_BOARD,
  SHARE_BOARD,
  putUserBoards,
  putCreatedBoard,
  putRenamedBoard
} from './actions';
import {
  UpdatedBoard,
  ListBoardData,
  DataForCreatingBoard,
  DataForRenamingBoard,
  DataForDeletingBoard
} from './types';
import {
  getBoards,
  createBoard,
  updateBoardName,
  shareBoard,
  deleteBoard
} from '../../api/board-requests';
import resetStore from '../../../utils/reset-store';
import { removeAuthDataFromLocalStorage } from '../../../utils/auth-data-localstorage';

function* workerGetBoards(): SagaIterator {
  const data: ListBoardData | number = yield call(getBoards);
  if (data === 401) {
    removeAuthDataFromLocalStorage();
    resetStore();
  } else {
    yield put(putUserBoards(data.data));
  }
}

function* watchGetBoards(): SagaIterator {
  yield takeEvery(GET_BOARDS, workerGetBoards);
}

function* workerCreateBoard(boardData: { type: string; payload: DataForCreatingBoard }) {
  const data: UpdatedBoard | number = yield call(createBoard, boardData.payload);
  if (data === 401) {
    removeAuthDataFromLocalStorage();
    resetStore();
  } else {
    yield put(putCreatedBoard(data.data));
  }
}

function* watchCreateBoard(): SagaIterator {
  yield takeEvery(CREATE_BOARD, workerCreateBoard);
}

function* workerRenameBoard(board: { type: string; payload: DataForRenamingBoard }) {
  const data: UpdatedBoard | number = yield call(updateBoardName, board.payload);
  if (data === 401) {
    removeAuthDataFromLocalStorage();
    resetStore();
  } else {
    yield put(putRenamedBoard(data.data));
  }
}

function* watchRenameBoard(): SagaIterator {
  yield takeEvery(RENAME_BOARD, workerRenameBoard);
}

function* workerShareBoard(board: { type: string; payload: DataForDeletingBoard }) {
  const data: null | number = yield call(shareBoard, board.payload);
  if (data === 401) {
    resetStore();
  }
}

function* watchShareBoard(): SagaIterator {
  yield takeEvery(SHARE_BOARD, workerShareBoard);
}

function* workerDeleteBoard(board: { type: string; payload: DataForDeletingBoard }) {
  yield call(deleteBoard, board.payload);
  const data: ListBoardData | number = yield call(getBoards);
  if (data === 401) {
    removeAuthDataFromLocalStorage();
    resetStore();
  } else {
    yield put(putUserBoards(data.data));
  }
}

function* watchDeleteBoard(): SagaIterator {
  yield takeEvery(DELETE_BOARD, workerDeleteBoard);
}

export { watchGetBoards, watchCreateBoard, watchRenameBoard, watchDeleteBoard, watchShareBoard };
