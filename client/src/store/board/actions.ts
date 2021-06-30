import {
  DataForCreatingBoard,
  DataForRenamingBoard,
  DataForDeletingBoard,
  BoardTypes,
  BoardList,
  Board
} from './types';

const GET_BOARDS = 'GET_BOARDS';
const CREATE_BOARD = 'CREATE_BOARD';
const RENAME_BOARD = 'RENAME_BOARD';
const SHARE_BOARD = 'SHARE_BOARD';
const DELETE_BOARD = 'DELETE_BOARD';

const getBoards = (): { type: string } => ({
  type: GET_BOARDS
});

const createBoard = (
  data: DataForCreatingBoard
): { type: string; payload: DataForCreatingBoard } => ({
  type: CREATE_BOARD,
  payload: data
});

const renameBoard = (
  data: DataForRenamingBoard
): { type: string; payload: DataForRenamingBoard } => ({
  type: RENAME_BOARD,
  payload: data
});

const shareBoard = (
  data: DataForDeletingBoard
): { type: string; payload: DataForDeletingBoard } => ({
  type: SHARE_BOARD,
  payload: data
});

const deleteBoard = (
  data: DataForDeletingBoard
): { type: string; payload: DataForDeletingBoard } => ({
  type: DELETE_BOARD,
  payload: data
});

const putUserBoards = (boards: BoardList): { type: string; payload: BoardList } => ({
  type: BoardTypes.PUT_USER_BOARDS,
  payload: boards
});

const putCreatedBoard = (newBoard: Board): { type: string; payload: Board } => ({
  type: BoardTypes.PUT_CREATED_BOARD,
  payload: newBoard
});

const putRenamedBoard = (renamedBoard: Board): { type: string; payload: Board } => ({
  type: BoardTypes.PUT_RENAMED_BOARD,
  payload: renamedBoard
});

const deleteBoardsData = (): { type: string } => ({ type: BoardTypes.DELETE_BOARDS_DATA });

export {
  GET_BOARDS,
  CREATE_BOARD,
  RENAME_BOARD,
  SHARE_BOARD,
  DELETE_BOARD,
  putUserBoards,
  putCreatedBoard,
  putRenamedBoard,
  getBoards,
  createBoard,
  renameBoard,
  shareBoard,
  deleteBoard,
  deleteBoardsData
};
