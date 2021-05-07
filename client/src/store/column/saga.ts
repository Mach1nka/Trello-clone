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
  ColumnList,
  Column,
  UpdatedColumn,
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
import { signOutUser } from '../auth/actions';

function* workerGetColumns(): SagaIterator {
  const data: ColumnList | number = yield call(getColumns);
  if (data === 401) {
    yield put(signOutUser());
  } else {
    yield put(putColumns(data as ColumnList));
  }
}

function* watchGetColumns(): SagaIterator {
  yield takeEvery(GET_COLUMNS, workerGetColumns);
}

function* workerCreateColumn(columnData: { type: string; payload: DataForCreatingColumn }) {
  const data: Column | number = yield call(createColumn, columnData.payload);
  if (data === 401) {
    yield put(signOutUser());
  } else {
    yield put(putCreatedColumn(data as Column));
  }
}

function* watchCreateColumn(): SagaIterator {
  yield takeEvery(CREATE_COLUMN, workerCreateColumn);
}

function* workerRenameColumn(columnData: { type: string; payload: DataForRenamingColumn }) {
  const data: UpdatedColumn | number = yield call(updateColumnName, columnData.payload);
  if (data === 401) {
    yield put(signOutUser());
  } else {
    yield put(putRenamedColumn(data as UpdatedColumn));
  }
}

function* watchRenameColumn(): SagaIterator {
  yield takeEvery(RENAME_COLUMN, workerRenameColumn);
}

function* workerChangeColumnPos(columnData: { type: string; payload: DataForUpdatingColumnPos }) {
  const data: UpdatedColumn | number = yield call(updateColumnPosition, columnData.payload);
  if (data === 401) {
    yield put(signOutUser());
  } else {
    yield put(putUpdatedPos(data as UpdatedColumn));
  }
}

function* watchChangeColumnPos(): SagaIterator {
  yield takeEvery(CHANGE_COLUMN_POSITION, workerChangeColumnPos);
}

function* workerDeleteBoard(columnData: { type: string; payload: DataForDeletingColumn }) {
  yield call(deleteColumn, columnData.payload);
  const data: ColumnList | number = yield call(getColumns);
  if (data === 401) {
    yield put(signOutUser());
  } else {
    yield put(putColumns(data as ColumnList));
  }
}

function* watchDeleteColumn(): SagaIterator {
  yield takeEvery(DELETE_COLUMN, workerDeleteBoard);
}

export {
  watchGetColumns,
  watchCreateColumn,
  watchRenameColumn,
  watchChangeColumnPos,
  watchDeleteColumn
};
