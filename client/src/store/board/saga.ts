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
  Board,
  BoardList,
  DataForCreatingBoard,
  DataForRenamingBoard,
  DataForDeletingBoard,
  BaseResponse
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
  const response: BaseResponse<BoardList> = yield call(getBoards);

  if (response.data) {
    yield put(putUserBoards(response.data));
  }

  if (response.statusCode === 401) {
    removeAuthDataFromLocalStorage();
    resetStore();
  }
}

function* watchGetBoards(): SagaIterator {
  yield takeEvery(GET_BOARDS, workerGetBoards);
}

function* workerCreateBoard(boardData: { type: string; payload: DataForCreatingBoard }) {
  const response: BaseResponse<Board> = yield call(createBoard, boardData.payload);

  if (response.data) {
    yield put(putCreatedBoard(response.data));
  }

  if (response.statusCode === 401) {
    removeAuthDataFromLocalStorage();
    resetStore();
  }
}

function* watchCreateBoard(): SagaIterator {
  yield takeEvery(CREATE_BOARD, workerCreateBoard);
}

function* workerRenameBoard(board: { type: string; payload: DataForRenamingBoard }) {
  const response: BaseResponse<Board> = yield call(updateBoardName, board.payload);

  if (response.data) {
    yield put(putRenamedBoard(response.data));
  }

  if (response.statusCode === 401) {
    removeAuthDataFromLocalStorage();
    resetStore();
  }
}

function* watchRenameBoard(): SagaIterator {
  yield takeEvery(RENAME_BOARD, workerRenameBoard);
}

function* workerShareBoard(board: { type: string; payload: DataForDeletingBoard }) {
  const response: BaseResponse<Record<string, never>> = yield call(shareBoard, board.payload);
  if (response.statusCode === 401) {
    resetStore();
  }
}

function* watchShareBoard(): SagaIterator {
  yield takeEvery(SHARE_BOARD, workerShareBoard);
}

function* workerDeleteBoard(board: { type: string; payload: DataForDeletingBoard }) {
  yield call(deleteBoard, board.payload);
  const response: BaseResponse<BoardList> = yield call(getBoards);

  if (response.data) {
    yield put(putUserBoards(response.data));
  }

  if (response.statusCode === 401) {
    removeAuthDataFromLocalStorage();
    resetStore();
  }
}

function* watchDeleteBoard(): SagaIterator {
  yield takeEvery(DELETE_BOARD, workerDeleteBoard);
}

export { watchGetBoards, watchCreateBoard, watchRenameBoard, watchDeleteBoard, watchShareBoard };
