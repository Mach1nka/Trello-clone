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

export type DataForSharingBoard = DataForDeletingBoard;

export interface Board {
  name: string;
  id: string;
}

export interface BoardDataServer {
  ownBoards: Board[];
  sharedBoards: Board[];
}

export interface BoardData {
  ownBoards: Board[];
  sharedBoards: Board[];
}

export enum BoardActions {
  PUT_BOARDS = 'PUT_BOARDS',
  PUT_CREATED_BOARD = 'PUT_CREATE_BOARD',
  PUT_RENAMED_BOARD = 'PUT_RENAMED_BOARD',
  DELETE_BOARDS_DATA = 'DELETE_BOARDS_DATA',
}

export const replaceBoardName = (state: BoardData, payload: Board): Board[] =>
  state.ownBoards.map((el) =>
    el.id === payload.id ? { id: payload.id, name: payload.name } : el
  );
