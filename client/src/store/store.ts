import { createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './root-reducer';
import rootSaga from './root-saga';
import { AccountData } from './auth/actions';

function saveToLocalStorage(state: AccountData) {
  try {
    const serialisedState = {
      authData: { ...state }
    };
    localStorage.setItem('authData', JSON.stringify(serialisedState));
  } catch (e) {
    console.warn(e);
  }
}

function loadFromLocalStorage() {
  try {
    const serialisedState = localStorage.getItem('authData');
    if (serialisedState === null) return undefined;
    return JSON.parse(serialisedState);
  } catch (e) {
    console.warn(e);
    return undefined;
  }
}

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  loadFromLocalStorage(),
  compose(applyMiddleware(sagaMiddleware), composeEnhancers())
);
sagaMiddleware.run(rootSaga);

store.subscribe(() => saveToLocalStorage(store.getState().authData));

export default store;

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
