export enum ColumnActions {
  PUT_COLUMNS = 'PUT_COLUMNS',
  PUT_CREATED_COLUMN = 'PUT_CREATED_COLUMN',
  PUT_RENAMED_COLUMN = 'PUT_RENAMED_COLUMN',
  PUT_COLUMN_WITH_NEW_POSITION = 'PUT_COLUMN_WITH_NEW_POSITION',
  DELETE_COLUMNS_DATA = 'DELETE_COLUMNS_DATA',
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

export interface ColumnData {
  columns: Column[];
}

export const replaceColumnName = (
  state: ColumnData,
  payload: Column
): Column[] =>
  state.columns.map((el) =>
    el.id === payload.id
      ? {
          id: payload.id,
          boardId: payload.boardId,
          name: payload.name,
          position: el.position,
        }
      : el
  );
