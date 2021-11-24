import { combineReducers } from 'redux';
import authData from './auth/reducer';
import userBoards from './board/reducer';
import boardColumns from './column/reducer';
import cardsData from './card/reducer';
import modalsData from './modals/reducer';

const rootReducer = combineReducers({ authData, userBoards, boardColumns, cardsData, modalsData });

export default rootReducer;
