import { combineReducers } from 'redux';
import authData from './auth/reducer';
import userBoards from './board/reducer';
import boardColumns from './column/reducer';
import cardsData from './card/reducer';
import modalsData from './data-for-modals/reducer';
import { USER_LOGGED_OUT } from './auth/actions';

const appReducer = combineReducers({ authData, userBoards, boardColumns, cardsData, modalsData });

type RootState = ReturnType<typeof appReducer>;

const rootReducer = (state: RootState, action: { type: string }) => {
  if (action.type === USER_LOGGED_OUT) {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
