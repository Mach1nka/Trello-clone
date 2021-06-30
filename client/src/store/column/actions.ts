import {
  DataForCreatingColumn,
  DataForRenamingColumn,
  DataForUpdatingColumnPos,
  DataForDeletingColumn,
  ColumnTypes,
  Column
} from './types';

const GET_COLUMNS = 'GET_COLUMNS';
const CREATE_COLUMN = 'CREATE_COLUMN';
const RENAME_COLUMN = 'RENAME_COLUMN';
const CHANGE_COLUMN_POSITION = 'CHANGE_COLUMN_POSITION';
const DELETE_COLUMN = 'DELETE_COLUMN';

const getColumns = (boardId: string): { type: string; payload: string } => ({
  type: GET_COLUMNS,
  payload: boardId
});

const createColumn = (
  data: DataForCreatingColumn
): { type: string; payload: DataForCreatingColumn } => ({
  type: CREATE_COLUMN,
  payload: data
});

const renameColumn = (
  data: DataForRenamingColumn
): { type: string; payload: DataForRenamingColumn } => ({
  type: RENAME_COLUMN,
  payload: data
});

const changeColumnPosition = (
  data: DataForUpdatingColumnPos
): { type: string; payload: DataForUpdatingColumnPos } => ({
  type: CHANGE_COLUMN_POSITION,
  payload: data
});

const deleteColumn = (
  data: DataForDeletingColumn
): { type: string; payload: DataForDeletingColumn } => ({
  type: DELETE_COLUMN,
  payload: data
});

const putColumns = (columns: Column[]): { type: string; payload: Column[] } => ({
  type: ColumnTypes.PUT_COLUMNS,
  payload: columns
});

const putCreatedColumn = (newColumn: Column): { type: string; payload: Column } => ({
  type: ColumnTypes.PUT_CREATED_COLUMN,
  payload: newColumn
});

const putRenamedColumn = (renamedColumn: Column): { type: string; payload: Column } => ({
  type: ColumnTypes.PUT_RENAMED_COLUMN,
  payload: renamedColumn
});

const putUpdatedPos = (columnWithNewPos: Column[]): { type: string; payload: Column[] } => ({
  type: ColumnTypes.PUT_COLUMN_WITH_NEW_POSITION,
  payload: columnWithNewPos
});

const deleteColumnsData = (): { type: string } => ({ type: ColumnTypes.DELETE_COLUMNS_DATA });

export {
  GET_COLUMNS,
  CREATE_COLUMN,
  RENAME_COLUMN,
  CHANGE_COLUMN_POSITION,
  DELETE_COLUMN,
  getColumns,
  createColumn,
  renameColumn,
  changeColumnPosition,
  deleteColumn,
  putColumns,
  putCreatedColumn,
  putRenamedColumn,
  putUpdatedPos,
  deleteColumnsData
};
