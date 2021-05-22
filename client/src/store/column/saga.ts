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
  deleteColumnsData,
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
import { signOutUser } from '../auth/actions';
import { deleteBoardsData } from '../board/actions';

function* workerGetColumns(columnData: { type: string; payload: string }): SagaIterator {
  const data: Column[] | number = yield call(getColumns, columnData.payload);
  if (data === 401) {
    yield put(signOutUser());
    yield put(deleteBoardsData());
    yield put(deleteColumnsData());
  } else {
    yield put(putColumns(data as Column[]));
  }
}

function* watchGetColumns(): SagaIterator {
  yield takeEvery(GET_COLUMNS, workerGetColumns);
}

function* workerCreateColumn(columnData: { type: string; payload: DataForCreatingColumn }) {
  const data: Column | number = yield call(createColumn, columnData.payload);
  if (data === 401) {
    yield put(signOutUser());
    yield put(deleteBoardsData());
    yield put(deleteColumnsData());
  } else {
    yield put(putCreatedColumn(data as Column));
  }
}

function* watchCreateColumn(): SagaIterator {
  yield takeEvery(CREATE_COLUMN, workerCreateColumn);
}

function* workerRenameColumn(columnData: { type: string; payload: DataForRenamingColumn }) {
  const data: Column | number = yield call(updateColumnName, columnData.payload);
  if (data === 401) {
    yield put(signOutUser());
    yield put(deleteBoardsData());
    yield put(deleteColumnsData());
  } else {
    yield put(putRenamedColumn(data as Column));
  }
}

function* watchRenameColumn(): SagaIterator {
  yield takeEvery(RENAME_COLUMN, workerRenameColumn);
}

function* workerChangeColumnPos(columnData: { type: string; payload: DataForUpdatingColumnPos }) {
  const data: Column[] | number = yield call(updateColumnPosition, columnData.payload);
  if (data === 401) {
    yield put(signOutUser());
    yield put(deleteBoardsData());
    yield put(deleteColumnsData());
  } else {
    yield put(putUpdatedPos(data as Column[]));
  }
}

function* watchChangeColumnPos(): SagaIterator {
  yield takeEvery(CHANGE_COLUMN_POSITION, workerChangeColumnPos);
}

function* workerDeleteColumn(columnData: { type: string; payload: DataForDeletingColumn }) {
  yield call(deleteColumn, columnData.payload);
  const data: Column[] | number = yield call(getColumns, columnData.payload.boardId);
  if (data === 401) {
    yield put(signOutUser());
    yield put(deleteBoardsData());
    yield put(deleteColumnsData());
  } else {
    yield put(putColumns(data as Column[]));
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
