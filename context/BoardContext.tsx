import { useReducer, Context, createContext, Dispatch } from 'react';

import {
  BoardActions,
  BoardData,
  Board,
  replaceBoardName,
} from 'services/resources/model/board.model';

interface PutBoardsAction {
  type: BoardActions.PUT_BOARDS;
  payload: BoardData;
}

interface PutCreatedBoardAction {
  type: BoardActions.PUT_CREATED_BOARD;
  payload: Board;
}

interface PutRenamedBoardAction {
  type: BoardActions.PUT_RENAMED_BOARD;
  payload: Board;
}

interface DeleteBoardsAction {
  type: BoardActions.DELETE_BOARDS_DATA;
}

type Action =
  | PutBoardsAction
  | PutCreatedBoardAction
  | PutRenamedBoardAction
  | DeleteBoardsAction;

interface BoardContextValue {
  ownBoards: Board[];
  sharedBoards: Board[];
  dispatch: Dispatch<Action>;
}

const initialState: BoardData = {
  ownBoards: [],
  sharedBoards: [],
};

function reducer(state: BoardData, action: Action): BoardData {
  switch (action.type) {
    case BoardActions.PUT_BOARDS:
      return { ...state, ...action.payload };
    case BoardActions.PUT_CREATED_BOARD:
      return {
        ...state,
        ownBoards: state.ownBoards.concat(action.payload),
      };
    case BoardActions.PUT_RENAMED_BOARD:
      return {
        ...state,
        ownBoards: replaceBoardName(state, action.payload),
      };
    case BoardActions.DELETE_BOARDS_DATA:
      return { ...state, ...initialState };
    default:
      return state;
  }
}

export const BoardContext: Context<BoardContextValue> =
  createContext<BoardContextValue>({
    ...initialState,
    dispatch: () => {},
  });

const BoardProvider: React.FC = ({ children }) => {
  const [boards, dispatch] = useReducer(reducer, initialState);

  return (
    <BoardContext.Provider value={{ ...boards, dispatch }}>
      {children}
    </BoardContext.Provider>
  );
};

export default BoardProvider;
