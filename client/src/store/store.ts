import { createStore, compose } from 'redux';
import rootReducer from './reducers/root-reducer';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  // eslint-disable-next-line no-underscore-dangle
  compose(composeEnhancers())
);

export default store;
