import { PUT_USER_DATA } from '../actions/auth-action';

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
    default:
      return state;
  }
};

export default authData;
