import { useEffect, useReducer, Context, createContext, Dispatch } from 'react';
import { getCookie } from 'cookies-next';

import { AuthActions, AuthData } from 'services/resources/model/auth.model';
import { httpService } from 'services/HttpService';
import { AlertContext } from './AlertContext';

interface AuthLogInAction {
  type: AuthActions.LOG_IN;
  payload: AuthData;
}

interface AuthLogOutAction {
  type: AuthActions.LOG_OUT;
}

type Action = AuthLogInAction | AuthLogOutAction;

interface AuthContextValue {
  user: AuthData;
  dispatch: Dispatch<Action>;
}

const initialState: AuthData = {
  id: null,
  login: null,
  token: null,
};

function reducer(state: AuthData, action: Action): AuthData {
  switch (action.type) {
    case AuthActions.LOG_IN:
      return { ...state, ...action.payload };
    case AuthActions.LOG_OUT:
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
  // const token = useRef(httpService.getAuthToken());
  // const { alerts } = useContext(AlertContext);
  // const [httpToken, setToken] = useState(httpService.getAuthToken());
  // const token = useMemo(() => httpService.getAuthToken(), [alerts]);

  useEffect(() => {
    if (state.token) {
      httpService.setAuthToken(state.token);
    }
    if (!state.token) {
      httpService.setAuthToken('');
    }
  }, [state.token]);

  return (
    <AuthContext.Provider value={{ user: state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
