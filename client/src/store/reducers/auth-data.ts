import { PUT_USER_DATA, PUT_MESSAGE_ERROR } from '../actions/auth';

interface AccountData {
  login: string;
  token: string;
  message?: string;
}

const authDataIS = {
  login: '',
  token: '',
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
