export enum ColumnTypes {
  PUT_COLUMNS = 'PUT_COLUMNS',
  PUT_CREATED_COLUMN = 'PUT_CREATED_COLUMN',
  PUT_RENAMED_COLUMN = 'PUT_RENAMED_COLUMN',
  PUT_COLUMN_WITH_NEW_POSITION = 'PUT_COLUMN_WITH_NEW_POSITION',
  DELETE_COLUMNS_DATA = 'DELETE_COLUMNS_DATA'
}

export interface Column {
  id: string;
  name: string;
  boardId: string;
  position: number;
}

export interface DataForCreatingColumn {
  boardId: string;
  name: string;
  position: number;
}

export interface DataForRenamingColumn {
  columnId: string;
  newName: string;
}

export interface DataForUpdatingColumnPos {
  columnId: string;
  boardId: string;
  newPosition: number;
}

export interface DataForDeletingColumn {
  columnId: string;
  boardId: string;
}

export interface ListColumnData {
  data: Column[];
  statusCode: number;
}

export interface UpdatedColumn {
  data: Column;
  statusCode: number;
}

export type BoardActions =
  | { type: ColumnTypes.PUT_COLUMNS; payload: Column[] }
  | { type: ColumnTypes.PUT_CREATED_COLUMN; payload: Column }
  | { type: ColumnTypes.PUT_RENAMED_COLUMN; payload: Column }
  | { type: ColumnTypes.PUT_COLUMN_WITH_NEW_POSITION; payload: Column[] }
  | { type: ColumnTypes.DELETE_COLUMNS_DATA };
