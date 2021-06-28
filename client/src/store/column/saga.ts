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
  putUpdatedPos,
  Column,
  DataForCreatingColumn,
  DataForRenamingColumn,
  DataForUpdatingColumnPos,
  DataForDeletingColumn
} from './actions';
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
  const data: Column[] | number = yield call(getColumns, columnData.payload);
  if (data.statusCode === 401) {
    removeAuthDataFromLocalStorage();
    resetStore();
  } else {
    yield put(putColumns(data.data));
  }
}

function* watchGetColumns(): SagaIterator {
  yield takeEvery(GET_COLUMNS, workerGetColumns);
}

function* workerCreateColumn(columnData: { type: string; payload: DataForCreatingColumn }) {
  const data: Column | number = yield call(createColumn, columnData.payload);
  if (data.statusCode === 401) {
    removeAuthDataFromLocalStorage();
    resetStore();
  } else {
    yield put(putCreatedColumn(data.data));
  }
}

function* watchCreateColumn(): SagaIterator {
  yield takeEvery(CREATE_COLUMN, workerCreateColumn);
}

function* workerRenameColumn(columnData: { type: string; payload: DataForRenamingColumn }) {
  const data: Column | number = yield call(updateColumnName, columnData.payload);
  if (data.statusCode === 401) {
    removeAuthDataFromLocalStorage();
    resetStore();
  } else {
    yield put(putRenamedColumn(data.data));
  }
}

function* watchRenameColumn(): SagaIterator {
  yield takeEvery(RENAME_COLUMN, workerRenameColumn);
}

function* workerChangeColumnPos(columnData: { type: string; payload: DataForUpdatingColumnPos }) {
  const data: Column[] | number = yield call(updateColumnPosition, columnData.payload);
  if (data.statusCode === 401) {
    removeAuthDataFromLocalStorage();
    resetStore();
  } else {
    yield put(putUpdatedPos(data.data));
  }
}

function* watchChangeColumnPos(): SagaIterator {
  yield takeEvery(CHANGE_COLUMN_POSITION, workerChangeColumnPos);
}

function* workerDeleteColumn(columnData: { type: string; payload: DataForDeletingColumn }) {
  yield call(deleteColumn, columnData.payload);
  const data: Column[] | number = yield call(getColumns, columnData.payload.boardId);
  if (data.statusCode === 401) {
    removeAuthDataFromLocalStorage();
    resetStore();
  } else {
    yield put(putColumns(data.data));
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
