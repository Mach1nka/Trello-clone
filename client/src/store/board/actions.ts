const PUT_USER_BOARDS = 'PUT_USER_BOARDS';
const PUT_CREATED_BOARD = 'PUT_CREATE_BOARD';
const DELETE_BOARD = 'DELETE_BOARD';
const PUT_RENAMED_BOARD = 'PUT_RENAMED_BOARD';
const GET_BOARDS = 'GET_BOARDS';
const CREATE_BOARD = 'CREATE_BOARD';
const RENAME_BOARD = 'RENAME_BOARD';
const DELETE_BOARDS_DATA = 'DELETE_BOARDS_DATA';

export interface Board {
  name: string;
  id: string;
}

export interface BoardList {
  boards: Board[];
}

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

const deleteBoard = (
  data: DataForDeletingBoard
): { type: string; payload: DataForDeletingBoard } => ({
  type: DELETE_BOARD,
  payload: data
});

const putUserBoards = (boards: BoardList): { type: string; payload: BoardList } => ({
  type: PUT_USER_BOARDS,
  payload: boards
});

const putCreatedBoard = (newBoard: Board): { type: string; payload: Board } => ({
  type: PUT_CREATED_BOARD,
  payload: newBoard
});

const putRenamedBoard = (renamedBoard: Board): { type: string; payload: Board } => ({
  type: PUT_RENAMED_BOARD,
  payload: renamedBoard
});

const deleteAllBoards = (): { type: string } => ({ type: DELETE_BOARDS_DATA });

export {
  GET_BOARDS,
  CREATE_BOARD,
  RENAME_BOARD,
  DELETE_BOARD,
  PUT_USER_BOARDS,
  PUT_CREATED_BOARD,
  PUT_RENAMED_BOARD,
  DELETE_BOARDS_DATA,
  putUserBoards,
  putCreatedBoard,
  putRenamedBoard,
  getBoards,
  createBoard,
  renameBoard,
  deleteBoard,
  deleteAllBoards
};
