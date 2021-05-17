import { combineReducers } from 'redux';
import authData from './auth/reducer';
import userBoards from './board/reducer';
import boardColumns from './column/reducer';

const rootReducer = combineReducers({ authData, userBoards, boardColumns });

export default rootReducer;
