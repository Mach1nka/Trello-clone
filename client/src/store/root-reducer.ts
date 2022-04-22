import { combineReducers } from '@reduxjs/toolkit';
import auth from './slices/auth';
import boardReducer from './slices/board';
import columnReducer from './slices/column';
import cardReducer from './slices/card';
import maintain from './slices/maintain';

const rootReducer = combineReducers({ auth, boardReducer, columnReducer, cardReducer, maintain });

export default rootReducer;
