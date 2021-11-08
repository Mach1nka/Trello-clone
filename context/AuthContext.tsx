import { useEffect, useReducer, Context, createContext, Dispatch } from 'react';

import { AuthTypes, AuthData } from 'services/resources/model/auth.model';
import { httpService } from 'services/HttpService';

interface AuthLogInAction {
  type: AuthTypes.LOG_IN;
  payload: AuthData;
}

interface AuthLogOutAction {
  type: AuthTypes.LOG_OUT;
}

type AuthAction = AuthLogInAction | AuthLogOutAction;

interface AuthContextValue {
  user: AuthData;
  dispatch: Dispatch<AuthAction>;
}

const initialState: AuthData = {
  id: null,
  login: null,
  token: null,
};

function reducer(state: AuthData, action: AuthAction): AuthData {
  switch (action.type) {
    case AuthTypes.LOG_IN:
      return { ...state, ...action.payload };
    case AuthTypes.LOG_OUT:
      return { ...state, ...initialState };
    default:
      return state;
  }
}

export const AuthContext: Context<AuthContextValue> =
  createContext<AuthContextValue>({
    user: {
      id: null,
      login: null,
      token: null,
    },
    dispatch: () => {},
  });

const AuthProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (!httpService.getAuthToken()) {
      dispatch({ type: AuthTypes.LOG_OUT });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user: state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
