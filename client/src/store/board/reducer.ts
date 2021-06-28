import {
  PUT_USER_BOARDS,
  PUT_RENAMED_BOARD,
  PUT_CREATED_BOARD,
  DELETE_BOARDS_DATA,
  BoardList,
  Board
} from './actions';
import replaceBoardName from '../../../utils/replace-board-name';

const initialBoardsState: BoardList = {
  ownBoards: [],
  sharedBoards: []
};

const userBoards = (
  state = initialBoardsState,
  { type, payload }: { type: string; payload: BoardList | Board }
): BoardList => {
  switch (type) {
    case PUT_USER_BOARDS:
      return { ...state, ...payload };
    case PUT_RENAMED_BOARD:
      return {
        ...state,
        ownBoards: replaceBoardName(state, payload as Board)
      };
    case PUT_CREATED_BOARD:
      return {
        ...state,
        ownBoards: state.ownBoards.concat(payload as Board)
      };
    case DELETE_BOARDS_DATA:
      return { ...state, ...initialBoardsState };
    default:
      return state;
  }
};

export default userBoards;
