import store from '../src/store/store';

function getToken(): string {
  const state = store.getState();
  return state.authData.token;
}

export default getToken;
