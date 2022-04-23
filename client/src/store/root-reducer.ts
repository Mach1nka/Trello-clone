import { combineReducers } from '@reduxjs/toolkit';

import authState from './slices/auth';
import boardsState from './slices/board';
import columnsState from './slices/column';
import cardsState from './slices/card';
import maintainState from './slices/maintain';

const rootReducer = combineReducers({
  authState,
  boardsState,
  columnsState,
  cardsState,
  maintainState
});

export default rootReducer;
