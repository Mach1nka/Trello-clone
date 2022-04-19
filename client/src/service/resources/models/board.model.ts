export interface Board {
  name: string;
  id: string;
}

export interface BoardListServerResponse {
  ownBoards: Board[];
  sharedBoards: Board[];
}

export type BoardState = BoardListServerResponse;

export interface DataForCreatingBoard {
  name: string;
}

export interface DataForRenamingBoard {
  newName: string;
  boardId: string;
}

export interface DataForSharingBoard {
  boardId: string;
  newParticipantId: string;
}

export interface DataForDeletingBoard {
  boardId: string;
}

export enum BoardThunkAction {
  GetBoards = 'getBoards',
  CreateBoard = 'createBoard',
  RenameBoard = 'renameBoard',
  ShareBoard = 'shareBoard',
  DeleteBoard = 'deleteBoard'
}
