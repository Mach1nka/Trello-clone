import { useReducer, Context, createContext, Dispatch } from 'react';

interface CardDetail {
  cardName: string;
  cardId: string;
  columnId: string;
  cardDescription: string;
}

export interface ModalDetailsData extends CardDetail {
  isDisplay: boolean;
}

export enum ModalActions {
  PUT_DETAILS = 'PUT_DETAILS',
  UPDATE_DISPLAY = 'UPDATE_DISPLAY',
  RESET = 'RESET',
}

interface PutDetailsAction {
  type: ModalActions.PUT_DETAILS;
  payload: CardDetail;
}

interface UpdateDetailsDisplayAction {
  type: ModalActions.UPDATE_DISPLAY;
  payload: boolean;
}

interface ResetDetailsAction {
  type: ModalActions.RESET;
}

type Action =
  | PutDetailsAction
  | ResetDetailsAction
  | UpdateDetailsDisplayAction;

interface ModalContextValue extends ModalDetailsData {
  dispatch: Dispatch<Action>;
}

const initialState: ModalDetailsData = {
  cardName: '',
  cardId: '',
  columnId: '',
  cardDescription: '',
  isDisplay: false,
};

function reducer(state: ModalDetailsData, action: Action): ModalDetailsData {
  switch (action.type) {
    case ModalActions.PUT_DETAILS:
      return { ...state, ...action.payload };
    case ModalActions.UPDATE_DISPLAY:
      return { ...state, isDisplay: action.payload };
    case ModalActions.RESET:
      return { ...state, ...initialState };
    default:
      return state;
  }
}

export const ModalContext: Context<ModalContextValue> =
  createContext<ModalContextValue>({
    ...initialState,
    dispatch: () => {},
  });

const ModalProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ModalContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
