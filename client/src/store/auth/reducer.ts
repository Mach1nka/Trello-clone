import { PUT_USER_DATA, PUT_MESSAGE_ERROR, SIGN_OUT_USER, AccountData } from './actions';

const authDataIS: AccountData = {
  login: '',
  token: '',
  id: '',
  message: ''
};

const authData = (
  state = authDataIS,
  { type, payload }: { type: string; payload: AccountData }
): AccountData => {
  switch (type) {
    case PUT_USER_DATA:
      return {
        ...state,
        ...payload
      };
    case SIGN_OUT_USER:
      return {
        ...state,
        ...authDataIS
      };
    case PUT_MESSAGE_ERROR:
      return {
        ...state,
        message: ''
      };
    default:
      return state;
  }
};

export default authData;
