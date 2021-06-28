import { Action } from 'redux';

import store from '../src/store/store';
import { signOutUser } from '../src/store/auth/actions';
import { deleteBoardsData } from '../src/store/board/actions';
import { deleteCardsData } from '../src/store/card/actions';
import { deleteColumnsData } from '../src/store/column/actions';
import { resetModalData } from '../src/store/modals/actions';

const resetStore = (): Action<T> => {
  store.dispatch(signOutUser());
  store.dispatch(deleteBoardsData());
  store.dispatch(deleteCardsData());
  store.dispatch(deleteColumnsData());
  store.dispatch(resetModalData());
};

export default resetStore;
