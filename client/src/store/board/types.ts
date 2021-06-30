export enum BoardTypes {
  PUT_USER_BOARDS = 'PUT_USER_BOARDS',
  PUT_CREATED_BOARD = 'PUT_CREATE_BOARD',
  PUT_RENAMED_BOARD = 'PUT_RENAMED_BOARD',
  DELETE_BOARDS_DATA = 'DELETE_BOARDS_DATA'
}

export interface DataForCreatingBoard {
  name: string;
  userId: string;
}

export interface DataForRenamingBoard {
  newName: string;
  boardId: string;
  userId: string;
}

export interface DataForDeletingBoard {
  userId: string;
  boardId: string;
}

export interface Board {
  name: string;
  id: string;
}

export interface BoardList {
  ownBoards: Board[];
  sharedBoards: Board[];
}

export interface ListBoardData {
  data: BoardList;
  statusCode: number;
}

export interface UpdatedBoard {
  data: Board;
  statusCode: number;
}

export type BoardActions =
  | { type: BoardTypes.PUT_USER_BOARDS; payload: BoardList }
  | { type: BoardTypes.PUT_CREATED_BOARD; payload: Board }
  | { type: BoardTypes.PUT_RENAMED_BOARD; payload: Board }
  | { type: BoardTypes.DELETE_BOARDS_DATA };
