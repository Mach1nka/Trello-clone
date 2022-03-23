import { BoardColumn } from '../../app/entities/column';

export interface ParamsForGetting {
  boardId: string;
}

export type ColumnResponse = Pick<BoardColumn, 'id' | 'name' | 'position'> & {
  boardId: string;
};

export interface BodyForCreating {
  boardId: string;
  name: string;
}

export interface BodyForRenaming {
  columnId: string;
  newName: string;
}

export interface BodyForReposition {
  columnId: string;
  boardId: string;
  newPosition: number;
}

export interface BodyForDeleting {
  columnId: string;
  boardId: string;
}
