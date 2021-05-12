import { all, call } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import { watchUserRegistration, watchUserLogin } from './auth/saga';
import { watchGetBoards, watchCreateBoard, watchRenameBoard, watchDeleteBoard } from './board/saga';

export default function* rootSaga(): SagaIterator {
  yield all([
    call(watchUserRegistration),
    call(watchUserLogin),
    call(watchGetBoards),
    call(watchCreateBoard),
    call(watchRenameBoard),
    call(watchDeleteBoard)
  ]);
}
