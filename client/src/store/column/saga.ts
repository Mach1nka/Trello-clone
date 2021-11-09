import { takeEvery, ForkEffect } from 'redux-saga/effects';

import {
  GET_COLUMNS,
  CREATE_COLUMN,
  RENAME_COLUMN,
  DELETE_COLUMN,
  CHANGE_COLUMN_POSITION,
  putColumns,
  putCreatedColumn,
  putRenamedColumn,
  putUpdatedPos
} from './actions';
import {
  Column,
  DataForCreatingColumn,
  DataForRenamingColumn,
  DataForUpdatingColumnPos,
  DataForDeletingColumn
} from './types';
import {
  getColumns,
  createColumn,
  updateColumnName,
  updateColumnPosition,
  deleteColumn
} from '../../api/column-requests';
import handleSagaRequest from '../../../utils/handle-saga-request';

function* workerGetColumns(columnData: { type: string; payload: string }) {
  yield handleSagaRequest<string, Column[]>(getColumns, columnData.payload, putColumns);
  // const response: BaseResponse<Column[]> = yield call(getColumns, columnData.payload);
}

function* watchGetColumns(): Generator<ForkEffect> {
  yield takeEvery(GET_COLUMNS, workerGetColumns);
}

function* workerCreateColumn(columnData: { type: string; payload: DataForCreatingColumn }) {
  yield handleSagaRequest<DataForCreatingColumn, Column>(
    createColumn,
    columnData.payload,
    putCreatedColumn
  );
  // const response: BaseResponse<Column> = yield call(createColumn, columnData.payload);
}

function* watchCreateColumn(): Generator<ForkEffect> {
  yield takeEvery(CREATE_COLUMN, workerCreateColumn);
}

function* workerRenameColumn(columnData: { type: string; payload: DataForRenamingColumn }) {
  yield handleSagaRequest<DataForRenamingColumn, Column>(
    updateColumnName,
    columnData.payload,
    putRenamedColumn
  );
  // const response: BaseResponse<Column> = yield call(updateColumnName, columnData.payload);
}

function* watchRenameColumn(): Generator<ForkEffect> {
  yield takeEvery(RENAME_COLUMN, workerRenameColumn);
}

function* workerChangeColumnPos(columnData: { type: string; payload: DataForUpdatingColumnPos }) {
  yield handleSagaRequest<DataForUpdatingColumnPos, Column[]>(
    updateColumnPosition,
    columnData.payload,
    putUpdatedPos
  );
  // const response: BaseResponse<Column[]> = yield call(updateColumnPosition, columnData.payload);
}

function* watchChangeColumnPos(): Generator<ForkEffect> {
  yield takeEvery(CHANGE_COLUMN_POSITION, workerChangeColumnPos);
}

function* workerDeleteColumn(columnData: { type: string; payload: DataForDeletingColumn }) {
  yield handleSagaRequest<DataForDeletingColumn, Record<string, never>>(
    deleteColumn,
    columnData.payload
  );
  yield handleSagaRequest<string, Column[]>(getColumns, columnData.payload.boardId, putColumns);

  // yield call(deleteColumn, columnData.payload);
  // const response: BaseResponse<Column[]> = yield call(getColumns, columnData.payload.boardId);
}

function* watchDeleteColumn(): Generator<ForkEffect> {
  yield takeEvery(DELETE_COLUMN, workerDeleteColumn);
}

export {
  watchGetColumns,
  watchCreateColumn,
  watchRenameColumn,
  watchChangeColumnPos,
  watchDeleteColumn
};
