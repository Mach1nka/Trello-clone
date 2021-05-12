import { combineReducers } from 'redux';
import authData from './auth/reducer';
import userBoards from './board/reducer';

const rootReducer = combineReducers({ authData, userBoards });

export default rootReducer;
