import { combineReducers } from 'redux';
import authData from './auth/reducer';
import userBoards from './board/reducer';
import boardColumns from './column/reducer';
import cardData from './card/reducer';

const rootReducer = combineReducers({ authData, userBoards, boardColumns, cardData });

export default rootReducer;
