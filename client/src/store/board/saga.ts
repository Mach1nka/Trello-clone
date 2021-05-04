import { takeEvery, call, put } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import {
  DELETE_BOARD,
  GET_BOARDS,
  CREATE_BOARD,
  RENAME_BOARD,
  putUserBoards,
  putCreatedBoard,
  putRenamedBoard,
  BoardList,
  Board,
  DataForCreatingBoard,
  DataForRenamingBoard,
  DataForDeletingBoard
} from './actions';
import { getBoards, createBoard, updateBoardName, deleteBoard } from '../../api/board-requests';

function* workerGetBoards(): SagaIterator {
  const data: BoardList = yield call(getBoards);
  yield put(putUserBoards(data));
}

function* watchGetBoards(): SagaIterator {
  yield takeEvery(GET_BOARDS, workerGetBoards);
}

function* workerCreateBoard(boardData: { type: string; payload: DataForCreatingBoard }) {
  const data: Board = yield call(createBoard, boardData.payload);
  yield put(putCreatedBoard(data));
}

function* watchCreateBoard(): SagaIterator {
  yield takeEvery(CREATE_BOARD, workerCreateBoard);
}

function* workerRenameBoard(board: { type: string; payload: DataForRenamingBoard }) {
  const data: Board = yield call(updateBoardName, board.payload);
  yield put(putRenamedBoard(data));
}

function* watchRenameBoard(): SagaIterator {
  yield takeEvery(RENAME_BOARD, workerRenameBoard);
}

function* workerDeleteBoard(board: { type: string; payload: DataForDeletingBoard }) {
  yield call(deleteBoard, board.payload);
  const data: BoardList = yield call(getBoards);
  yield put(putUserBoards(data));
}

function* watchDeleteBoard(): SagaIterator {
  yield takeEvery(DELETE_BOARD, workerDeleteBoard);
}

export { watchGetBoards, watchCreateBoard, watchRenameBoard, watchDeleteBoard };
