import { takeEvery, call, put } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';

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
  BaseResponse,
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
import resetStore from '../../../utils/reset-store';
import { removeAuthDataFromLocalStorage } from '../../../utils/auth-data-localstorage';

function* workerGetColumns(columnData: { type: string; payload: string }): SagaIterator {
  const response: BaseResponse<Column[]> = yield call(getColumns, columnData.payload);

  if (response.data) {
    yield put(putColumns(response.data));
  }

  if (response.statusCode === 401) {
    removeAuthDataFromLocalStorage();
    resetStore();
  }
}

function* watchGetColumns(): SagaIterator {
  yield takeEvery(GET_COLUMNS, workerGetColumns);
}

function* workerCreateColumn(columnData: { type: string; payload: DataForCreatingColumn }) {
  const response: BaseResponse<Column> = yield call(createColumn, columnData.payload);

  if (response.data) {
    yield put(putCreatedColumn(response.data));
  }

  if (response.statusCode === 401) {
    removeAuthDataFromLocalStorage();
    resetStore();
  }
}

function* watchCreateColumn(): SagaIterator {
  yield takeEvery(CREATE_COLUMN, workerCreateColumn);
}

function* workerRenameColumn(columnData: { type: string; payload: DataForRenamingColumn }) {
  const response: BaseResponse<Column> = yield call(updateColumnName, columnData.payload);

  if (response.data) {
    yield put(putRenamedColumn(response.data));
  }

  if (response.statusCode === 401) {
    removeAuthDataFromLocalStorage();
    resetStore();
  }
}

function* watchRenameColumn(): SagaIterator {
  yield takeEvery(RENAME_COLUMN, workerRenameColumn);
}

function* workerChangeColumnPos(columnData: { type: string; payload: DataForUpdatingColumnPos }) {
  const response: BaseResponse<Column[]> = yield call(updateColumnPosition, columnData.payload);

  if (response.data) {
    yield put(putUpdatedPos(response.data));
  }

  if (response.statusCode === 401) {
    removeAuthDataFromLocalStorage();
    resetStore();
  }
}

function* watchChangeColumnPos(): SagaIterator {
  yield takeEvery(CHANGE_COLUMN_POSITION, workerChangeColumnPos);
}

function* workerDeleteColumn(columnData: { type: string; payload: DataForDeletingColumn }) {
  yield call(deleteColumn, columnData.payload);
  const response: BaseResponse<Column[]> = yield call(getColumns, columnData.payload.boardId);

  if (response.data) {
    yield put(putColumns(response.data));
  }

  if (response.statusCode === 401) {
    removeAuthDataFromLocalStorage();
    resetStore();
  }
}

function* watchDeleteColumn(): SagaIterator {
  yield takeEvery(DELETE_COLUMN, workerDeleteColumn);
}

export {
  watchGetColumns,
  watchCreateColumn,
  watchRenameColumn,
  watchChangeColumnPos,
  watchDeleteColumn
};
