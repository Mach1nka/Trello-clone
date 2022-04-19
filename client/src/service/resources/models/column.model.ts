export interface Column {
  id: string;
  name: string;
  boardId: string;
  position: number;
}

export interface ColumnListServerResponse {
  columns: Column[];
}

export type ColumnState = ColumnListServerResponse;

export interface DataForCreatingColumn {
  boardId: string;
  name: string;
}

export interface DataForRenamingColumn {
  columnId: string;
  newName: string;
}

export interface DataForRepositionColumn {
  columnId: string;
  boardId: string;
  newPosition: number;
}

export interface DataForDeletingColumn {
  columnId: string;
  boardId: string;
}

export enum ColumnThunkAction {
  GetColumns = 'getColumns',
  CreateColumn = 'createColumn',
  RenameColumn = 'renameColumn',
  UpdateColumnPosition = 'updateColumnPosition',
  DeleteColumn = 'deleteColumn'
}
