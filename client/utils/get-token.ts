import store from '../src/store/store';

const getToken = (): string => {
  const state = store.getState();
  return state.authData.token;
};

export default getToken;
