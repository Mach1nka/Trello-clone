import { createStore, applyMiddleware, Store, AnyAction } from 'redux';
import { createWrapper } from 'next-redux-wrapper';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware, { Task } from 'redux-saga';

import rootReducer from './root-reducer';
import rootSaga from './root-saga';

// @note Improve Store types
export interface SagaStore extends Store<any, AnyAction> {
  sagaTask: Task;
}

export const makeStore = (initialState = {}): Store => {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(sagaMiddleware))
  );

  (store as SagaStore).sagaTask = sagaMiddleware.run(rootSaga);

  return store;
};

export const wrapper = createWrapper(makeStore, { debug: true });
