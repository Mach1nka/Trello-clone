import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './slices/auth';
import boardReducer from './slices/board';
import columnReducer from './slices/column';
import cardReducer from './slices/card';

const rootReducer = combineReducers({ authReducer, boardReducer, columnReducer, cardReducer });

export default rootReducer;
