import { Board } from '../../app/entities/board';

export type BoardResponse = Pick<Board, 'id' | 'name'>;

export interface AccessibleBoardsResponse {
  ownBoards: Board[];
  sharedBoards: Board[];
}

export interface BodyForCreatingBoard {
  name: string;
}

export interface BodyForRenamingBoard {
  newName: string;
  boardId: string;
}

export interface BodyForSharingBoard {
  newParticipantId: string;
  boardId: string;
}

export interface BodyForDeletingBoard {
  boardId: string;
}
