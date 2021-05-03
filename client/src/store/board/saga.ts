import { takeEvery, call, put } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import {
  getBoards,
  createBoard,
  updateBoardName,
  deleteBoard as apiDeleteBoard
} from '../../api/board-requests';
import {
  PUT_USER_BOARDS,
  PUT_CREATED_BOARD,
  PUT_RENAMED_BOARD,
  DELETE_BOARD,
  putUserBoards,
  putCreatedBoard,
  putRenamedBoard,
  deleteBoard,
  BoardList,
  Board
} from './actions';

export interface DataForCreatingBoard {
  name: string;
  userId: string;
}

export interface DataForRenamingBoard {
  newName: string;
  boardId: string;
}

export interface DataForDeletingBoard {
  userId: string;
  boardId: string;
}

function* workerGetBoards(): SagaIterator {
  const data: BoardList = yield call(getBoards);
  yield put(putUserBoards(data));
}

function* watchGetBoards(): SagaIterator {
  yield takeEvery(PUT_USER_BOARDS, workerGetBoards);
}

function* workerCreateBoard(boardData: { type: string; payload: DataForCreatingBoard }) {
  const data: Board = yield call(createBoard, boardData.payload);
  yield put(putCreatedBoard(data));
}

function* watchCreateBoard(): SagaIterator {
  yield takeEvery(PUT_CREATED_BOARD, workerCreateBoard);
}

function* workerRenameBoard(board: { type: string; payload: DataForRenamingBoard }) {
  const data: Board = yield call(updateBoardName, board.payload);
  yield put(putRenamedBoard(data));
}

function* watchRenameBoard(): SagaIterator {
  yield takeEvery(PUT_RENAMED_BOARD, workerRenameBoard);
}

function* workerDeleteBoard(board: { type: string; payload: DataForDeletingBoard }) {
  yield call(apiDeleteBoard, board.payload);
  const data: BoardList = yield call(getBoards);
  yield put(putUserBoards(data));
}

function* watchDeleteBoard(): SagaIterator {
  yield takeEvery(DELETE_BOARD, workerDeleteBoard);
}

export { watchGetBoards, watchCreateBoard, watchRenameBoard, watchDeleteBoard };
