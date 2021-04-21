import { combineReducers } from 'redux';
import authData from './auth/reducer';

const rootReducer = combineReducers({ authData });

export default rootReducer;
