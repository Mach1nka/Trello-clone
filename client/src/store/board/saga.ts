import { takeEvery, ForkEffect } from 'redux-saga/effects';

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
  DataForDeletingBoard
} from './types';
import {
  getBoards,
  createBoard,
  updateBoardName,
  shareBoard,
  deleteBoard
} from '../../api/board-requests';
import handleSagaRequest from '../../../utils/handle-saga-request';

function* workerGetBoards() {
  yield handleSagaRequest<Record<string, never>, BoardList>(getBoards, {}, putUserBoards);
}

function* watchGetBoards(): Generator<ForkEffect> {
  yield takeEvery(GET_BOARDS, workerGetBoards);
}

function* workerCreateBoard(board: { type: string; payload: DataForCreatingBoard }) {
  yield handleSagaRequest<DataForCreatingBoard, Board>(createBoard, board.payload, putCreatedBoard);
  // const response: BaseResponse<Board> = yield call(createBoard, boardData.payload);
}

function* watchCreateBoard(): Generator<ForkEffect> {
  yield takeEvery(CREATE_BOARD, workerCreateBoard);
}

function* workerRenameBoard(board: { type: string; payload: DataForRenamingBoard }) {
  yield handleSagaRequest<DataForRenamingBoard, Board>(
    updateBoardName,
    board.payload,
    putRenamedBoard
  );
  // const response: BaseResponse<Board> = yield call(updateBoardName, board.payload);
}

function* watchRenameBoard(): Generator<ForkEffect> {
  yield takeEvery(RENAME_BOARD, workerRenameBoard);
}

function* workerShareBoard(board: { type: string; payload: DataForDeletingBoard }) {
  yield handleSagaRequest<DataForDeletingBoard, Record<string, never>>(shareBoard, board.payload);
  // const response: BaseResponse<Record<string, never>> = yield call(shareBoard, board.payload);
}

function* watchShareBoard(): Generator<ForkEffect> {
  yield takeEvery(SHARE_BOARD, workerShareBoard);
}

function* workerDeleteBoard(board: { type: string; payload: DataForDeletingBoard }) {
  yield handleSagaRequest<DataForDeletingBoard, Record<string, never>>(deleteBoard, board.payload);
  yield handleSagaRequest<Record<string, never>, BoardList>(getBoards, {}, putUserBoards);
}

function* watchDeleteBoard(): Generator<ForkEffect> {
  yield takeEvery(DELETE_BOARD, workerDeleteBoard);
}

export { watchGetBoards, watchCreateBoard, watchRenameBoard, watchDeleteBoard, watchShareBoard };
