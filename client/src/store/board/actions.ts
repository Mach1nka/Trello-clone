const PUT_USER_BOARDS = 'PUT_USER_BOARDS';
const PUT_CREATED_BOARD = 'PUT_CREATE_BOARD';
const DELETE_BOARD = 'DELETE_BOARD';
const PUT_RENAMED_BOARD = 'PUT_RENAME_BOARD';

export interface Board {
  name: string;
  id: string;
}

export interface BoardList {
  boards: Board[];
}

const putUserBoards = (boards: BoardList): { type: string; payload: BoardList } => ({
  type: PUT_USER_BOARDS,
  payload: boards
});

const putCreatedBoard = (newBoard: Board): { type: string; payload: Board } => ({
  type: PUT_CREATED_BOARD,
  payload: newBoard
});

const deleteBoard = (): { type: string } => ({
  type: DELETE_BOARD
});

const putRenamedBoard = (renamedBoard: Board): { type: string; payload: Board } => ({
  type: PUT_RENAMED_BOARD,
  payload: renamedBoard
});

export {
  PUT_USER_BOARDS,
  PUT_CREATED_BOARD,
  DELETE_BOARD,
  PUT_RENAMED_BOARD,
  putUserBoards,
  deleteBoard,
  putCreatedBoard,
  putRenamedBoard
};
