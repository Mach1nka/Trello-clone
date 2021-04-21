import { combineReducers } from 'redux';
import authData from './auth-data-reducer';

const rootReducer = combineReducers({ authData });

export default rootReducer;
