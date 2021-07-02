import { AuthData } from '../src/store/auth/types';

const saveAuthDataToLocalStorage = (state: AuthData): void => {
  try {
    const serialisedState = {
      authData: { ...state }
    };
    localStorage.setItem('authData', JSON.stringify(serialisedState));
  } catch (e) {
    console.warn(e);
  }
};

const loadAuthDataFromLocalStorage = () => {
  try {
    const serialisedState = localStorage.getItem('authData');
    if (serialisedState === null) return undefined;
    return JSON.parse(serialisedState);
  } catch (e) {
    console.warn(e);
    return undefined;
  }
};

const removeAuthDataFromLocalStorage = (): void => {
  try {
    localStorage.removeItem('authData');
  } catch (e) {
    console.warn(e);
  }
};

export { saveAuthDataToLocalStorage, loadAuthDataFromLocalStorage, removeAuthDataFromLocalStorage };
