import {
  AccountDataInStore,
  AuthTypes,
  AuthActions,
} from 'services/resources/model/auth.model';

const initialAuthState: AccountDataInStore = {
  login: '',
  token: '',
  id: '',
  message: '',
};

const authData = (
  state = initialAuthState,
  action: AuthActions
): AccountDataInStore => {
  switch (action.type) {
    case AuthTypes.PUT_USER_DATA:
      return { ...state, ...action.payload };
    case AuthTypes.PUT_MESSAGE_ERROR:
      return {
        ...state,
        message: action.payload.message,
      };
    case AuthTypes.USER_LOGGED_OUT:
      return {
        ...state,
        ...initialAuthState,
      };
    default:
      return state;
  }
};

export default authData;
