import { BoardTypes, BoardList, BoardActions } from './types';
import replaceBoardName from '../../../utils/replace-board-name';

const initialBoardsState: BoardList = {
  ownBoards: [],
  sharedBoards: []
};

const userBoards = (state = initialBoardsState, action: BoardActions): BoardList => {
  switch (action.type) {
    case BoardTypes.PUT_USER_BOARDS:
      return { ...state, ...action.payload };
    case BoardTypes.PUT_RENAMED_BOARD:
      return {
        ...state,
        ownBoards: replaceBoardName(state, action.payload)
      };
    case BoardTypes.PUT_CREATED_BOARD:
      return {
        ...state,
        ownBoards: state.ownBoards.concat(action.payload)
      };
    case BoardTypes.DELETE_BOARDS_DATA:
      return { ...state, ...initialBoardsState };
    default:
      return state;
  }
};

export default userBoards;
