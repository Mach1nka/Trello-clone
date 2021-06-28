import { SuccessResponse } from '../src/store/auth/actions';

const saveAuthDataToLocalStorage = (state: SuccessResponse): void => {
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
