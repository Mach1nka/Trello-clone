import { Board } from '../../app/entities/board';
import { UserRole } from '../auth/interfaces';

export type BoardResponse = Pick<Board, 'id' | 'name'>;

export interface AccessibleBoardsResponse {
  ownBoards: Board[];
  sharedBoards: Board[];
}

export interface BodyForCreating {
  name: string;
}

export interface BodyForRenaming {
  newName: string;
  boardId: string;
}

export interface BodyForSharing {
  newParticipantId: string;
  boardId: string;
}

export interface BodyForDeleting {
  boardId: string;
}

export interface UserPermission {
  userRole: UserRole;
}
