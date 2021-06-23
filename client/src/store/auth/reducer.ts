import {
  PUT_USER_DATA,
  PUT_MESSAGE_ERROR,
  AccountDataInStore,
  SuccessResponse,
  ErrorResponse
} from './actions';

const authDataIS: AccountDataInStore = {
  login: '',
  token: '',
  id: '',
  message: ''
};

const authData = (
  state = authDataIS,
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
    default:
      return state;
  }
};

export default authData;
