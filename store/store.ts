import { createStore, applyMiddleware, Store, AnyAction } from 'redux';
import { Context, createWrapper } from 'next-redux-wrapper';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware, { Task } from 'redux-saga';

import rootReducer from './root-reducer';
import rootSaga from './root-saga';
import { State } from './types';

// @note Improve Store types
export interface SagaStore extends Store<State, AnyAction> {
  sagaTask?: Task;
}

export const makeStore = (context: Context): Store => {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(sagaMiddleware))
  );

  (store as SagaStore).sagaTask = sagaMiddleware.run(rootSaga);

  return store;
};

export const wrapper = createWrapper<Store<State>>(makeStore, { debug: true });
