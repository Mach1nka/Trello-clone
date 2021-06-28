import {
  PUT_USER_DATA,
  PUT_MESSAGE_ERROR,
  USER_LOGGED_OUT,
  AccountDataInStore,
  SuccessResponse,
  ErrorResponse
} from './actions';

const initialAuthState: AccountDataInStore = {
  login: '',
  token: '',
  id: '',
  message: ''
};

const authData = (
  state = initialAuthState,
  { type, payload }: { type: string; payload: SuccessResponse | ErrorResponse }
): AccountDataInStore => {
  switch (type) {
    case PUT_USER_DATA:
      return { ...state, ...payload };
    case PUT_MESSAGE_ERROR:
      return {
        ...state,
        message: payload.message
      };
    case USER_LOGGED_OUT:
      return {
        ...state,
        ...initialAuthState
      };
    default:
      return state;
  }
};

export default authData;
