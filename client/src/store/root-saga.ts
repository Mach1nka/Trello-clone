import { all, AllEffect, call, CallEffect } from 'redux-saga/effects';
import { watchUserRegistration, watchUserLogin } from './auth/saga';
import {
  watchGetBoards,
  watchCreateBoard,
  watchRenameBoard,
  watchShareBoard,
  watchDeleteBoard
} from './board/saga';
import {
  watchGetColumns,
  watchCreateColumn,
  watchRenameColumn,
  watchDeleteColumn,
  watchChangeColumnPos
} from './column/saga';
import {
  watchGetCards,
  watchCreateCard,
  watchRenameCard,
  watchChangeCardPos,
  watchChangeCardDesc,
  watchChangeCardStatus,
  watchDeleteCard
} from './card/saga';

export default function* rootSaga(): Generator<AllEffect<CallEffect>> {
  yield all([
    call(watchUserRegistration),
    call(watchUserLogin),
    call(watchGetBoards),
    call(watchCreateBoard),
    call(watchRenameBoard),
    call(watchShareBoard),
    call(watchDeleteBoard),
    call(watchGetColumns),
    call(watchCreateColumn),
    call(watchRenameColumn),
    call(watchChangeColumnPos),
    call(watchDeleteColumn),
    call(watchGetCards),
    call(watchCreateCard),
    call(watchRenameCard),
    call(watchChangeCardPos),
    call(watchChangeCardDesc),
    call(watchChangeCardStatus),
    call(watchDeleteCard)
  ]);
}
